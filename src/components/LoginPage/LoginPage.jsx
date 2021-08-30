import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import cryptoRandomString from 'crypto-random-string';
import { useDispatch, useSelector } from 'react-redux';
require('dotenv').config();

function LoginPage() {
   const history = useHistory();
   const dispatch = useDispatch();
   const failureResponse = (response) => {
      console.log(response);
   }
   const successResponse = (response) => {
      console.log("Response is:", response);
    }; 

   return (
      <div>
      <LoginForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
        <br />
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/forgotpassword');
          }}
        >
          Forgot Password?
        </button>
        <br />
        <GoogleLogin
            // clientId="process.env.GOOGLE_CLIENT_ID"
            clientId="1088702246729-sjul1ddverh7shltkjtqvk14q25k5oqo.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={successResponse}
            onFailure={failureResponse}
            cookiePolicy={'single_host_origin'}
         />
      </center>
    </div>
  );
}

export default LoginPage;
