import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
var nodemailer = require('nodemailer');


function ForgotPasswordPage() {
   const [email, setEmail] = useState('');
   const errors = useSelector(store => store.errors);
   const dispatch = useDispatch();
   // const transporter = nodemailer.createTransport({
   //    service: 'gmail',
   //    auth: {
   //       user: 'ooebroo@gmail.com',
   //       pass: 'insanity101'
   //    }
   //    });
   const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: 'morris.zemlak67@ethereal.email',
          pass: 'x5JkeyvCqCVPVmp9ax'
      }
  });


   const resetPassword = (event) => {
      event.preventDefault();
      console.log(email);
      transporter.sendMail({
         from: 'morris.zemlak67@ethereal.email',
         to: 'morris.zemlak67@ethereal.email',
         subject: 'Test',
         text: 'HELLO DID IT WORK?',
      });
  };

  return (
    <form className="formPanel" onSubmit={resetPassword}>
      <h2>Forgot Password</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Reset Password" />
      </div>
    </form>
  );
};

export default ForgotPasswordPage;