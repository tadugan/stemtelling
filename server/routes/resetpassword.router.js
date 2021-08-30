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
   const mailData = {
      from: 'Stemtelltest@gmail.com',
      to: `${req.body.email}`,
      subject: 'STEMTelling Password Reset Request',
      text: `Password Reset Request
      
      
      
      
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