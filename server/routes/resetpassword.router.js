const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');



const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
       user: 'Stemtelltest@gmail.com',
       pass: 'Stemtelltesting123!'
   }
});

router.post('/email', (req, res) => {
   const resetUUID = uuidv4();
   const userEmail = req.body.email.toLowerCase();
   const resetCode = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
   const getUserQuery = `SELECT * FROM "user" WHERE "email" = $1`;
   pool.query(getUserQuery, [userEmail])
   .then((result) => {
      console.log(result.rows);
      const userID = result.rows[0].id;
      console.log(userID);
      const qText = `INSERT INTO "reset_password" (id, uuid, email, code)
                     VALUES ($1, $2, $3, $4) RETURNING id`;
      pool.query(qText, [userID, resetUUID, userEmail, resetCode])
      .then((result) => {
         res.sendStatus(201);
      })
      .catch((error) => {
         console.log(error);
         res.sendStatus(401);
      })
   })
   .catch((error) => {
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