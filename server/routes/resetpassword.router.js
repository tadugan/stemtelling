const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
       user: 'Stemtelltest@gmail.com',
       pass: 'Stemtelltesting123!'
   }
});

router.post('/email', (req, res) => {
   const userEmail = req.body.email.toLowerCase();
   const getUserIDQuery = `SELECT * FROM "user" WHERE "email" = $1`;

   pool.query(getUserIDQuery, [userEmail]) // start of first query
   .then((result) => {
      const userID = result.rows[0].id; // sets ID in reset table equal to user ID
      const insertUserInfoQuery = `INSERT INTO "reset_password" (id, email)
                     VALUES ($1, $2) RETURNING id`;
      pool.query(insertUserInfoQuery, [userID, userEmail]) // start of second query
      .then((result) => {
         res.sendStatus(201);
         const getUUIDQuery = `SELECT "uuid" FROM "reset_password" WHERE "id" = $1 AND "email" = $2`;
         pool.query(getUUIDQuery, [userID, userEmail])
         .then((result) => {
            console.log(result)
         })
         .catch((error) => {
            console.log(error);  
         })
         

      })
      .catch((error) => { // end of second query
         console.log(error);
         res.sendStatus(401);
      })
   })
   .catch((error) => { // end of first query
      console.log(error);
      console.log("Email does not exist in database");
      res.sendStatus(404);
   });

   const mailData = {
      from: 'Stemtelltest@gmail.com',
      to: `${userEmail}`,
      subject: 'STEMTelling Password Reset Request',
      text: `Password Reset Request
Your code is ${req.body.confirmation_code}
      `,
   };
   transporter.sendMail(mailData, (error, info) => {
      if (error) {
         return console.log(error);
      }
      res.status(200).send({message: "Mail send", message_id: info.messageId});
   })
});

module.exports = router;