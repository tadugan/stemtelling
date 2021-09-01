import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* forgotPassword(action) { // handles sending an email when a user requests a password reset
   const email = action.payload.email;
   try {
      yield axios.delete('/api/resetpassword/removerequest', { params: { email } });
      yield axios.post('/api/resetpassword/sendresetemail', {email: email}); // sends email to the server for processing
   }
   catch (error) {
      console.log(error);
   };
};

function* getUUID(action) { // called on ResetPasswordPage load, checks if the UUID in the link URL has a valid match in the database
   const uuid = action.payload.uuid;
   try {
      const response = yield axios.get('/api/resetpassword/getuuid', { params: { uuid } }); // sends the UUID to resetpassword.router.js for validation
      if (response.data == 'invalid') { // if the server responds with 'invalid', an error occurs on the DOM
         yield put ({type: 'INVALID_LINK'});
      };
   }
   catch (error) {
      console.log(error);
   };
};

function* changePassword(action) { // handles changing the user password
   console.log(action.payload);
   try {
      yield axios.post('/api/resetpassword/changepassword', action.payload);
   }
   catch (error) {
      console.log('Error with changing password:', error);
   };
 };

function* resetPasswordSaga() {
   yield takeLatest('FORGOT_PASSWORD', forgotPassword);
   yield takeLatest('CHANGE_PASSWORD', changePassword);
   yield takeLatest('GET_UUID', getUUID);
 };
 
 export default resetPasswordSaga;