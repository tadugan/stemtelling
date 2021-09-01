import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ResetPasswordPage() {
   const dispatch = useDispatch();
   const history = useHistory();
   const errors = useSelector((store) => store.errors);
   const uuid = useSelector((store) => store.resetPassword);
   const [newPassword, setNewPassword] = useState('');
   const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
   const [isDisabled, setIsDisabled] = useState('');
   const getSearchQueryByFullURL = (url) => {return url.split('?confirmation=')}; // split URL into our base url and the confirmation code

   useEffect(() => { // checks for a valid link on page load
      dispatch({ // sends out a request to the server to check if the UUID in the URL is valid
         type: 'GET_UUID',
         payload: {
            uuid: getSearchQueryByFullURL(window.location.href)[1],
         },
      });
      if (errors.resetMessage == "Invalid Link") { // if we get back this response (invalid link), disable the inputs and reset button
         setIsDisabled(true);
      };
   });

   const resetPassword = () => { // main handler for the user to reset their password
      if (newPassword.length < 8 || confirmedNewPassword.length < 8) { // checks for passwords that are too short (under 8 characters)
         alert("Password is too short. Please enter at least 8 characters");
         setNewPassword('');
         setConfirmedNewPassword('');
         return false;
      }
      if (newPassword != confirmedNewPassword) { // checks for mismatched passwords
         alert("Passwords do not match");
         setNewPassword('');
         setConfirmedNewPassword('');
         return false;
      }
      else { // if none of the other are valid, submit the password
         dispatch({
            type: 'CHANGE_PASSWORD',
            payload: {
               newPassword: newPassword,
               uuid: getSearchQueryByFullURL(window.location.href)[1],
            },
         });
         history.push('/');
      };
   };

  return (
     <div className="formPanel">
      <div>
      {errors.resetMessage && (
            <h3 className="alert" role="alert">
               {errors.resetMessage}
            </h3>
         )}
        <label htmlFor="Enter New Password">
          Enter New Password:
          <input
            type="password"
            name="Enter New Password"
            required
            disabled={isDisabled}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="Confirm New Password">
          Confirm Password:
          <input
            type="password"
            name="Confirm New Password"
            required
            disabled={isDisabled}
            value={confirmedNewPassword}
            onChange={(event) => setConfirmedNewPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
         <button className="btn" onClick={resetPassword} disabled={isDisabled}>Set Password</button>
      </div>
   </div>
  );
};

export default ResetPasswordPage;