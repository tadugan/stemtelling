import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// function to save an edited STEMtell
// called after a user has clicked on the "Save" button while editing a STEMtell on their profile page
function* saveEditedStemtell(action) {
   try {
      yield axios.put('/api/stemtell/save', action.payload);
   }
   catch (error) {
      console.log('Error with saveEditedStemtell in editSTEMtell.saga.js:', error);
   };
};

// function to get all STEMtags associated with a specific STEMtell
// called when a user clicks on the "Edit" button on their profile page
function* getExistingTags(action) {
   try {
      const tagArray = yield axios.get(`/api/stemtell/tags/${action.payload}`);
      yield put({ type: 'ADD_EXISTING_TAGS_TO_STEMTELL', payload: tagArray.data });
   }
   catch (error) {
      console.log('Error with getExistingTags in editSTEMtell.saga.js:', error);
   };
};


// main export for this file
function* editStemtellSaga() {
   yield takeLatest('SAVE_EDITED_STEMTELL', saveEditedStemtell);
   yield takeLatest('GET_EXISTING_TAGS', getExistingTags);
};


export default editStemtellSaga;