import React from 'react';
import GoogleLogin from 'react-google-login';
import cryptoRandomString from 'crypto-random-string';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';

function RegisterPage() {
   const history = useHistory();
   const dispatch = useDispatch();
   const failureResponse = (response) => {
      console.log(response);
   }
   const successResponse = (response) => {
      console.log("Response is:", response.profileObj);
      dispatch({
         type: 'REGISTER',
         payload: {
            username: response.profileObj.name,
            password: cryptoRandomString({length: 32, type: 'base64'}),
            email: response.profileObj.email,
         },
      });
   }; 

   return (
      <div>
         <RegisterForm />
         <center>
            <GoogleLogin
               // clientId="process.env.GOOGLE_CLIENT_ID"
               clientId="1088702246729-sjul1ddverh7shltkjtqvk14q25k5oqo.apps.googleusercontent.com"
               buttonText="Register With Google"
               onSuccess={successResponse}
               onFailure={failureResponse}
               cookiePolicy={'single_host_origin'}
            />
            <br />
            <button
               type="button"
               className="btn btn_asLink"
               onClick={() => {
                  history.push('/login');
               }}
            >
               Login
            </button>
         </center>
      </div>
   );
};

export default RegisterPage;