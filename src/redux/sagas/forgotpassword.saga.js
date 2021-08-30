import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* forgotPassword(action) {
   try {
      yield axios.post('/api/resetpassword/email', {email: action.payload.email, confirmation_code: action.payload.confirmation_code});
   }
   catch (error) {
      console.log(error);
   };
};

function* forgotPasswordSaga() {
   yield takeLatest('FORGOT_PASSWORD', forgotPassword);
 }
 
 export default forgotPasswordSaga;