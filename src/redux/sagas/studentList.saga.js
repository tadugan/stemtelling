import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* studentListSaga(){
    yield takeEvery('GET_STUDENTLIST', getStudents);
}

function* getStudents() {
    try {
        const response = yield axios.get('/api/class/details');
        yield put({ type: 'SET_STUDENTLIST', payload: response.data});
        
    } catch (error) {
        console.log('Error GETting student details list', error);
    }
}

export default studentListSaga;