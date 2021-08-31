import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';



function ResetPasswordPage() {
   const [newPassword, setNewPassword] = useState('');
   const [confirmedNewPassword, setConfirmedNewPassword] = useState('');


   const test = () => {
      const queryString = window.location.search;
      console.log(queryString);
   }

  return (
     <div className="formPanel">
      <div>
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