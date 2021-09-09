import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function for getting teacher feedback
// called when
function* getFeedback(action) {
   try {
      const response = yield axios.get(`/api/comment/feedback/${action.payload}`);
      console.log("this is the response from getFeedback:", response.data);
      yield put({ type: 'SET_FEEDBACK', payload: response.data});
   }
   catch (error) {
      console.log('Error with getFeedback in feedback.saga.js:', error);
   };
};

function* updateStatus(action) {
   console.log('in update status with action:', action)
   try {
      yield axios.put(`/api/stemtell/status`, action.payload);
   }
   catch (error) {
      console.log('Error updating STEMtell status in feedback.saga', error);
   };
};

// main export for this function
function* feedbackSaga() {
   yield takeEvery('GET_FEEDBACK', getFeedback);
   yield takeEvery('UPDATE_STATUS', updateStatus)
};


export default feedbackSaga;