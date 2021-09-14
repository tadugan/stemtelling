const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
var nodemailer = require('nodemailer');
require('dotenv').config();
const websiteURL = new URL('http://localhost:3000/#/resetpassword/'); // origin point for resetting a password, will later be appended with a confirmation code. Edit this to whatever your website URL is

const transporter = nodemailer.createTransport({
// nodemailer handler, auth should be stored as a local .env variable and input in auth to avoid sensitive data leaking
   service: 'Gmail', // can be changed to different services, https://nodemailer.com/smtp/well-known/
   auth: {
      user: `${process.env.NODEMAILER_USER}`,
      pass: `${process.env.NODEMAILER_PASS}`,
   },
});


// DELETE /api/resetpassword/removerequest
// Handles DELETE request for removing any existing password reset requests
// called when a user enters their email to reset their password
router.delete('/removerequest', (req, res) => {
   const userEmail = req.query.email.toLowerCase();
   const deleteUserRequests = `DELETE FROM "reset_password" WHERE "email" = $1`;
   pool.query(deleteUserRequests, [userEmail])
   .then(() => {
      res.sendStatus(201);
   })
   .catch(error => {
      console.log("Error removing previous reset request in resetpassword.router.js:", error);
      res.sendStatus(500);
   });
});


// POST /api/resetpassword/sendresetemail
// Handles POST request for sending an email to the entered email
router.post('/sendresetemail', async (req, res) => {
   const client = await pool.connect();
   try {
      const userEmail = req.body.email.toLowerCase();
      const getUserIDQuery = `SELECT * FROM "user" WHERE "email" = $1`;
      const results = await pool.query(getUserIDQuery, [userEmail]); 
      const userID = results.rows[0].id; 
      const insertUserInfoQuery = `INSERT INTO "reset_password" (id, email)
                                   VALUES ($1, $2) RETURNING id`;
      await pool.query(insertUserInfoQuery, [userID, userEmail]); 
      const getUUIDQuery = `SELECT "uuid" FROM "reset_password" WHERE "id" = $1 AND "email" = $2`;
      const user_uuid = await pool.query(getUUIDQuery, [userID, userEmail]); 
      const resetPasswordUUID = user_uuid.rows[0].uuid;
      const resetEmail = { // nodemailer module
         from: 'Stemtelltest@gmail.com',
         to: `${userEmail}`,
         subject: 'STEMTelling Password Reset Request',
         text: `${websiteURL}?confirmation=${resetPasswordUUID}`,
      };
      transporter.sendMail(resetEmail, (error, info) => {
         if (error) {
            return console.log(error);
         }
         res
         .status(200)
         .send({ message: 'Mail send', message_id: info.messageId }); 
      });
      res.sendStatus(200); 
   }
   catch(error) {
      console.log('Error in sending password reset email in resetpassword.router.js:', error);
      res.sendStatus(500);
   };
});


// GET /api/resetpassword/getuuid
// checks for a valid uuid in the reset_password table
router.get('/getuuid', (req, res) => {
   const uuid = req.query.uuid;
   const qText = `SELECT * FROM "reset_password" WHERE "uuid" = $1`;
   pool.query(qText, [uuid])
   .then(results => {
      res.send(results.rows); 
   })
   .catch(error => {
      res.send('invalid');
   });
});


// POST /api/resetpassword/changepassword
// Handles POST request for resetting/updating the user password
// This is only called after an email has been entered, confirmed, and a new password has been selected by the user
// follows code similar to regular registration
router.post('/changepassword', async (req, res, next) => {
   const client = await pool.connect();
   try {
      const password = encryptLib.encryptPassword(req.body.newPassword);
      const uuid = req.body.uuid;
      const getUserQuery = 'SELECT * FROM "reset_password" WHERE "uuid" = $1';
      const results = await pool.query(getUserQuery, [uuid]);
      const updateUserQuery = `UPDATE "user" SET "password" = $1 WHERE "id" = $2 AND "email" = $3`;
      const userID = results.rows[0].id;
      const userEmail = results.rows[0].email;
      await pool.query(updateUserQuery, [password, userID, userEmail]);
      const clearResetTableQuery = `DELETE FROM "reset_password" WHERE "uuid" = $1`; 
      await pool.query(clearResetTableQuery, [uuid]);
   }
   catch(error) {
      console.log('Change password failed in resetpassword.router.js:', error);
      res.sendStatus(500);
   };
});


module.exports = router;