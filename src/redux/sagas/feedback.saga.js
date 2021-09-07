import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function for getting teacher feedback
// called when
function* getFeedback() {
   try {
      const response = yield axios.get('/api/comment/feedback');
      yield put({ type: 'SET_FEEDBACK', payload: response.data});
   }
   catch (error) {
      console.log('Error with getFeedback in feedback.saga.js:', error);
   };
};


// main export for this function
function* feedbackSaga() {
   yield takeEvery('GET_FEEDBACK', getFeedback);
};


export default feedbackSaga;