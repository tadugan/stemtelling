const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var nodemailer = require('nodemailer');
const { URLSearchParams } = require('url');

const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
       user: 'Stemtelltest@gmail.com',
       pass: 'Stemtelltesting123!'
   }
});
const websiteURL = "http://localhost:3000";

router.post('/email', (req, res) => {
   const userEmail = req.body.email.toLowerCase();
   const getUserIDQuery = `SELECT * FROM "user" WHERE "email" = $1`;

   pool.query(getUserIDQuery, [userEmail]) // start of first query
   .then(results => {
      const userID = results.rows[0].id; // sets ID in reset table equal to user ID
      const insertUserInfoQuery = `INSERT INTO "reset_password" (id, email)
                     VALUES ($1, $2) RETURNING id`;
      pool.query(insertUserInfoQuery, [userID, userEmail]) // start of second query
      .then(results => {
         const getUUIDQuery = `SELECT "uuid" FROM "reset_password" WHERE "id" = $1 AND "email" = $2`;
         pool.query(getUUIDQuery, [userID, userEmail]) // start of third query
         .then((results) => {
            const resetPasswordUUID = results.rows[0].uuid; 
            function encodeQueryData(data) {
               const ret = [];
               for (let d in data)
                 ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
               return ret.join('&');
            }
            const testUUID = encodeQueryData({confirmationUUID: resetPasswordUUID});
            console.log(testUUID);
            console.log(URLSearchParams.get(confirmationUUID))
            const resetEmail = {
               from: 'Stemtelltest@gmail.com',
               to: `${userEmail}`,
               subject: 'STEMTelling Password Reset Request',
               text: `
               ${websiteURL}/resetpassword/${resetPasswordUUID}
               
               
               `};
            
            transporter.sendMail(resetEmail, (error, info) => {
               if (error) {
                  return console.log(error);
               }
               res.status(200).send({message: "Mail send", message_id: info.messageId});
            });
         })
         .catch((error) => { // end of third query
            console.log(error);  
            res.sendStatus(401);
         });
      })
      .catch(error => { // end of second query   
         console.log(error);
         res.sendStatus(401);
      });
   })
   .catch(error => { // end of first query
      console.log(error);
      console.log("Email does not exist in database");
      res.sendStatus(404);
   });
});

module.exports = router;