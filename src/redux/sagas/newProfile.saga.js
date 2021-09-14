import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* submitNewTags(action) {
   try {
      yield axios.post('/api/tag/profile', action.payload);
      yield put({type: 'FETCH_USER_STEMTELLS'});
   } 
   catch (error) {
      console.log('Error with submitNewTags in newProfile.saga.js:', error);
   };
};


function* addTagsSaga() {
   yield takeLatest('SUBMIT_NEW_PROFILE_TAGS', submitNewTags);
};


export default addTagsSaga;