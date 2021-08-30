import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import cryptoRandomString from 'crypto-random-string';
import axios from 'axios';

function ForgotPasswordPage() {
   const history = useHistory();
   const [inputCode, setInputCode] = useState('');
   const [email, setEmail] = useState('');
   const errors = useSelector(store => store.errors);
   const dispatch = useDispatch();


   const resetPassword = () => { // main handler for password resetting, collects data from email input and dispatches it
      event.preventDefault();
      if (email == null || email == undefined || email == '' || email == ' ') {
         alert('Invalid Email');
         setEmail('');  
         return false;
      };
      const newCode = cryptoRandomString({length: 32, type: 'base64'});
      dispatch({
         type: 'FORGOT_PASSWORD',
         payload: {
            email: email,
            confirmation_code: newCode,
         },
      });
      setEmail('');
      console.log("reset code is:", newCode);
   };
   // end resetPassword handler

   
  return (
     <div className="formPanel">
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
        <label htmlFor="code">
          Code:
          <input
            type="text"
            name="code"
            required
            value={inputCode}
            onChange={(event) => setInputCode(event.target.value)}
          />
        </label>
      </div>
      <div>
         <button className="btn" onClick={resetPassword}>Reset Password</button>
      </div>
   </div>
  );
};

export default ForgotPasswordPage;