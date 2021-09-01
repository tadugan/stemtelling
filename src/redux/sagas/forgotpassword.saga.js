import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* forgotPassword(action) {
   try {
      yield axios.post('/api/resetpassword/sendresetemail', {email: action.payload.email, confirmation_code: action.payload.confirmation_code});
   }
   catch (error) {
      console.log(error);
   };
};

function* getUUID(action) {
   const uuid = action.payload.uuid;
   try {
       // clear any existing error on the reset password page
      const response = yield axios.get('/api/resetpassword/getuuid', { params: { uuid } });
      if (response.data == 'invalid') {
         yield put ({type: 'INVALID_LINK'});
      };
   }
   catch (error) {
      console.log(error);
   };
};

function* changePassword(action) {
   try {
      // clear any existing error on the registration page
      yield put({ type: 'CLEAR_REGISTRATION_ERROR' });
      // passes the email and password from the payload to the server
      yield axios.post('/api/user/changepassword', action.payload);
   }
   catch (error) {
      console.log('Error with changing password:', error);
      yield put({ type: 'REGISTRATION_FAILED' });
   };
 };

function* forgotPasswordSaga() {
   yield takeLatest('FORGOT_PASSWORD', forgotPassword);
   yield takeLatest('CHANGE_PASSWORD', changePassword);
   yield takeLatest('GET_UUID', getUUID);
 };
 
 export default forgotPasswordSaga;