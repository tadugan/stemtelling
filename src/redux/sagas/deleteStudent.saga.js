import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';


function* deleteStudentSaga(){
    yield takeEvery('DELETE_STUDENT', deleteStudent);
}

function* deleteStudent(action) {
    try {
        yield call(axios.delete, `/api/class/details/${action.payload}`);
      //   console.log(`What is in the DELETE STUDENT payload`, action.payload);
        yield put({ type: "GET_STUDENTLIST" });
    } catch (error) {
        console.log('Error deleting student', error);
    }
}

export default deleteStudentSaga;