const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
var nodemailer = require('nodemailer');
require('dotenv').config();
const { URLSearchParams } = require('url');

const transporter = nodemailer.createTransport({ // nodemailer handler, auth should be stored as a local .env variable and input in auth to avoid sensitive data leaking
   service: 'Gmail', // can be changed to different services, https://nodemailer.com/smtp/well-known/
   auth: {
       user: `${process.env.NODEMAILER_USER}`,
       pass: `${process.env.NODEMAILER_PASS}`
   }
});
const websiteURL = new URL ("http://localhost:3000/#/resetpassword/"); // origin point for resetting a password, will later be appended with a confirmation code. Edit this to whatever your website URL is

router.post('/sendresetemail', (req, res) => { // handler for sending out a password reset email to the user, as well as creating a temporary database placement for them
   const userEmail = req.body.email.toLowerCase();
   const getUserIDQuery = `SELECT * FROM "user" WHERE "email" = $1`;

   pool.query(getUserIDQuery, [userEmail]) // start of first query
   .then(results => {
      const userID = results.rows[0].id; // sets ID in reset table equal to user ID
      const insertUserInfoQuery = `INSERT INTO "reset_password" (id, email)
                     VALUES ($1, $2) RETURNING id`;
      pool.query(insertUserInfoQuery, [userID, userEmail]) // start of second query
      .then(() => {
         const getUUIDQuery = `SELECT "uuid" FROM "reset_password" WHERE "id" = $1 AND "email" = $2`;
         pool.query(getUUIDQuery, [userID, userEmail]) // start of third query
         .then(results => {
            const resetPasswordUUID = results.rows[0].uuid; 
            const resetEmail = { // nodemailer handler, this is what the email will be
               from: 'Stemtelltest@gmail.com',
               to: `${userEmail}`,
               subject: 'STEMTelling Password Reset Request',
               text: `${websiteURL}?confirmation=${resetPasswordUUID}`
            };
            transporter.sendMail(resetEmail, (error, info) => { // sends the email via nodemailer
               if (error) {
                  return console.log(error); // catch any nodemailer errors
               };
               res.status(200).send({message: "Mail send", message_id: info.messageId}); // success
            });
            res.sendStatus(200); // send pack a positive status code for our third query
         })
         .catch(error => { // end of third query
            console.log("Error in third query in password reset:", error);
            res.sendStatus(401);
         });
      })
      .catch(error => { // end of second query   
         console.log("Error in second query in password reset:", error);
         res.sendStatus(401);
      });
   })
   .catch(error => { // end of first query
      console.log("Error in first query in password reset:", error);
      res.sendStatus(401);
   });
});

router.get('/getuuid', (req, res) => { // checks for a valid uuid in the reset_password table
   const uuid = req.query.uuid;
   const qText = `SELECT * FROM "reset_password" WHERE "uuid" = $1`;
   pool.query(qText, [uuid])
   .then(results => {
      res.send(results.rows); // if there is a uuid, send it back
   })
   .catch(() => {
      res.send("invalid");
      // if there is no uuid in the database, an error will be caught. rather than logging it, we manipulate the error to send back a status in order to decline the ability to change password
      // removing this wil result in an error
   });
});

// Handles POST request for resetting/updating the user password
// This is only called after an email has been entered, confirmed, and a new password has been selected by the user
// follows code similar to regular registration
router.post('/changepassword', (req, res, next) => {
   const password = encryptLib.encryptPassword(req.body.newPassword);
   const uuid = req.body.uuid;
   const getUserQuery = 'SELECT * FROM "reset_password" WHERE "uuid" = $1';
   pool.query(getUserQuery, [uuid]) // start of first query
   .then(results => {
      const updateUserQuery = `UPDATE "user" SET "password" = $1 WHERE "id" = $2 AND "email" = $3`;
      const userID = results.rows[0].id;
      const userEmail = results.rows[0].email;
      pool.query(updateUserQuery, [password, userID, userEmail]) // start of second query
      .then(() => {
         const clearResetTableQuery = `DELETE FROM "reset_password" WHERE "uuid" = $1`; // start of third query
         pool.query(clearResetTableQuery, [uuid])
         .then(() => {
            res.sendStatus(200);
         })
         .catch(error => { // end of third query
            console.log("Error in clearing reset table: ", error);
            res.sendStatus(401);
         });
      })
      .catch(error => { // end of second query
         console.log("Error in changing password: ", error);
         res.sendStatus(401); 
      });
   })
   .catch(error => { // end of first query
      console.log('Change password failed: ', error);
      res.sendStatus(500);
   });
});

module.exports = router;