import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';


function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const resetPassword = () => {
     console.log(email);
  }

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