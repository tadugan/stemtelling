import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// function for fetching the current user
// called on login
function* fetchUser() {
   try {
      const config = {
         headers: { 'Content-Type': 'application/json' },
         withCredentials: true,
      };
      const response = yield axios.get('/api/user', config);
      yield put({ type: 'SET_USER', payload: response.data });
   }
   catch (error) {
      console.log('Error with fetchUser in user.saga.js:', error);
   };
};

// function for fetching a user profile
// called on load when a user is visiting a "ProfilePage"
function* fetchProfile(action) {
   const profileID = action.payload;
   try {
      const response = yield axios.get('/api/user/profile', { params: { profileID } });
      yield put({ type: 'SET_CURRENT_PROFILE', payload: response.data[0] });
   }
   catch (error) {
      console.log("Error with fetchProfile in user.saga.js:", error);
   };
};


// main export for this file
function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_PROFILE', fetchProfile);
};


export default userSaga;