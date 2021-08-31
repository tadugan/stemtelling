import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ForgotPasswordPage() {
   const history = useHistory();
   const [email, setEmail] = useState('');
   const dispatch = useDispatch();


   const resetPassword = () => { // main handler for password resetting, collects data from email input and dispatches it
      if (email == null || email == undefined || email == '' || email == ' ') {
         alert('Invalid Email');
         setEmail('');  
         return false;
      };
      dispatch({
         type: 'FORGOT_PASSWORD',
         payload: {
            email: email,
         },
      });
   };

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
         <button className="btn" onClick={resetPassword}>Reset Password</button>
      </div>
   </div>
  );
};

export default ForgotPasswordPage;