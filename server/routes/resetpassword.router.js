const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
var nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
   host: 'smtp.ethereal.email',
   port: 587,
   secure: false,
   auth: {
       user: 'morris.zemlak67@ethereal.email',
       pass: 'x5JkeyvCqCVPVmp9ax'
   }
});

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/email', (req, res) => {
   const {to, subject, text} = req.body;
   const mailData = {
      from: 'morris.zemlak67@ethereal.email',
      to: 'morris.zemlak67@ethereal.email',
      subject: 'Test',
      text: 'HELLO DID IT WORK?',
   };
   transporter.sendMail(mailData, (error, info) => {
      if (error) {
         return console.log(error);
      }
      res.status(200).send({message: "Mail send", message_id: info.messageId});
   })
});

module.exports = router;