import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


// function for getting all students associated with a specific class
// called when
function* getStudents(action) {
   console.log(action.payload)
    try {
        const response = yield axios.get(`/api/class/details/${action.payload}`);
        yield put({ type: 'SET_STUDENTLIST', payload: response.data});
        
    } catch (error) {
        console.log('Error GETting student details list', error);
    }
}


// main export for this file
function* studentListSaga() {
   yield takeEvery('GET_STUDENTLIST', getStudents);
};


export default studentListSaga;