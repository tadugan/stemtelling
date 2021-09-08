import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function to get comments
// called when
function* getComments() {
   try {
      const response = yield axios.get(`/api/comments`);
      yield put({ type: 'SET_COMMENTLIST', payload: response.data});
   }
   catch (error) {
      console.log('Error with getComments in comment.saga.js:', error);
   };
};

// function to add a comment
// called when a user clicks on the "comment" button while on a STEMtell's detailed view
function* addComment(action) {
   try {
      yield axios.post('/api/comment', action.payload);
      yield put({ type: 'GET_STEMTELL_COMMENTS', payload: action.payload.stemtell_id});
   }
   catch (error) {
      console.log('Error with addComment in comment.saga.js:   ', error);
   };
};

// function to get all comments associated with a specific STEMtell.
// called when loading a STEMtell's detailed view
function* getStemComments(action) {
   try {
      const response = yield axios.get(`/api/comment/stemcomments/${action.payload}`);
      yield put({ type: 'SET_STEMTELL_COMMENTS', payload: response.data});
   }
   catch (error) {
      console.log('Error with getStemComments in comment.saga.js:', error);
   };
};


// main export for this file
function* commentSaga(){
   yield takeEvery('GET_COMMENTLIST', getComments);
   yield takeEvery('ADD_COMMENT', addComment); 
   yield takeEvery('GET_STEMTELL_COMMENTS', getStemComments);
};


export default commentSaga;