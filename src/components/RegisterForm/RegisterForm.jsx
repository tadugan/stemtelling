import React, { useState } from 'react';
import { put, takeLatest } from 'redux-saga/effects';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
   const [password, setPassword] = useState('');
   const [confirmedPassword, setConfirmedPassword] = useState('');
   const [email, setEmail] = useState('');
   const errors = useSelector((store) => store.errors);
   const dispatch = useDispatch();

   const registerUser = (event) => {
      event.preventDefault();
      if (password != confirmedPassword) {
         dispatch({
            type: 'MISMATCHED_PASSWORDS'})
         setPassword('');
         setConfirmedPassword('');
         return false;
    };

    dispatch({
      type: 'REGISTER',
      payload: {
        email: email.toLowerCase(),
        password: password,
      },
    });
  }; // end registerUser

   return (
      <form className="formPanel" onSubmit={registerUser}>
         <h2>Register</h2>
         {errors.registrationMessage && (
            <h3 className="alert" role="alert">
               {errors.registrationMessage}
            </h3>
         )}
         <br /><br /><br /><br /><br />
         <div>
         <label htmlFor="email">
            Email:
            <input
               type="email"
               name="email"
               value={email}
               required
               onChange={(event) => setEmail(event.target.value)}
            />
         </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="Confirm Password">
          Confirm Password:
          <input
            type="password"
            name="Confirm Password"
            value={confirmedPassword}
            required
            onChange={(event) => setConfirmedPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
