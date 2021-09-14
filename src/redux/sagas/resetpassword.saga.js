import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// function for clearing existing password reset requests and for sending an email to the user 
// called after a user has entered their email on the "ForgotPassword" page and clicked on the "Submit" button
function* forgotPassword(action) {
   const email = action.payload.email;
   try {
      yield axios.delete('/api/resetpassword/removerequest', { params: { email } });
      yield axios.post('/api/resetpassword/sendresetemail', { email: email });
   }
   catch (error) {
      console.log('Error with forgotPassword in resetpassword.saga.js:', error);
   };
};


// function for getting the UUID associated with a password reset link
// called on page load for "ResetPasswordPage"
function* getUUID(action) {
   const uuid = action.payload.uuid;
   try {
      const response = yield axios.get('/api/resetpassword/getuuid', { params: { uuid } });
      if (response.data == 'invalid' || response.data.length == 0) {
         yield put ({type: 'INVALID_LINK'});
      };
   }
   catch (error) {
      console.log('Error with getUUID in resetpassword.saga.js:', error);
   };
};


// function for handling the change of a user password
// called after a user has clicked the "Save Password" button on the "ResetPassword" page
function* changePassword(action) {
   try {
      yield axios.post('/api/resetpassword/changepassword', action.payload);
   }
   catch (error) {
      console.log('Error with changePassword in resetpassword.saga.js:', error);
   };
};


// main export for this file
function* resetPasswordSaga() {
   yield takeLatest('FORGOT_PASSWORD', forgotPassword);
   yield takeLatest('CHANGE_PASSWORD', changePassword);
   yield takeLatest('GET_UUID', getUUID);
};

 
export default resetPasswordSaga;