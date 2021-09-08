import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// function for getting all STEMtags in the database
// called when the user is creating a STEMtell
function* getAllTags() {
   try {
      const allTags = yield axios.get('/api/tag');
      yield put({ type: 'SET_TAGS', payload: allTags.data});
   } 
   catch (error) {
      console.log('Error with getAllTags in tag.saga.js:', error);
   };
};


// main export for this file
function* tagSaga() {
   yield takeLatest('GET_ALL_TAGS', getAllTags);
};


export default tagSaga;