import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';


// function to delete a student from a class
// called on a class details page
function* deleteStudent(action) {
   try {
      yield call(axios.delete, `/api/class/details/${action.payload.deleteStudent}`, {params: {classCode: action.payload.classCode}});
      yield put({ type: "GET_STUDENTLIST", payload: action.payload.classCode});
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