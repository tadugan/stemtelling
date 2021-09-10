import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* getReviewStemtells() {
   try {
        const reviewStemtells = yield axios.get('/api/review');
        yield put({ type: 'SET_TEACHER_REVIEW_LIST', payload: reviewStemtells.data});
   }
   catch (error) {
      console.log('Error GETing review/unapproved STEMtells:', error);
   };
};


// main export for this file
function* teacherReviewListSaga() {
   yield takeLatest('GET_REVIEW_STEMTELLS', getReviewStemtells);
};


export default teacherReviewListSaga;