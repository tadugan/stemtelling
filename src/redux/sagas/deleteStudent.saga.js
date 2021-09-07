import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';


// function to delete a student
// called when
function* deleteStudent(action) {
   try {
      yield call(axios.delete, `/api/class/details/${action.payload}`);
      yield put({ type: "GET_STUDENTLIST" });
   }
   catch (error) {
      console.log('Error with deleteStudent in deleteStudent.saga.js:', error);
   };
};


// main export for this file
function* deleteStudentSaga() {
    yield takeEvery('DELETE_STUDENT', deleteStudent);
};


export default deleteStudentSaga;