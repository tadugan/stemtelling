import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

function ResetPasswordPage() {
   const dispatch = useDispatch();
   const errors = useSelector((store) => store.errors);
   const uuid = useSelector((store) => store.resetPassword);
   const [newPassword, setNewPassword] = useState('');
   const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
   const getSearchQueryByFullURL = (url) => {return url.split('?confirmation=')}; // split URL into our base url and the confirmation code

   useEffect(() => {
      console.log("UUID gathered from URL is:", getSearchQueryByFullURL(window.location.href)[1]);
      dispatch({
         type: 'GET_UUID',
         payload: {
            uuid: getSearchQueryByFullURL(window.location.href)[1],
         },
      });
    });

   const test = () => {
      console.log(getSearchQueryByFullURL(window.location.href));
   }

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
            value={confirmedNewPassword}
            onChange={(event) => setConfirmedNewPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
         <button className="btn" onClick={test}>Set Password</button>
      </div>
   </div>
  );
};

export default ResetPasswordPage;