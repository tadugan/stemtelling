import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// function for getting STEMtells that need to be reviewed
// called on a review STEMtells page
function* getReviewStemtells() {
   try {
      const reviewStemtells = yield axios.get('/api/review');
      yield put({ type: 'SET_TEACHER_REVIEW_LIST', payload: reviewStemtells.data});
   }
   catch (error) {
      console.log('Error with getReviewStemtells in teacherReviewList.saga.js:', error);
   };
};


// main export for this file
function* teacherReviewListSaga() {
   yield takeLatest('GET_REVIEW_STEMTELLS', getReviewStemtells);
};


export default teacherReviewListSaga;