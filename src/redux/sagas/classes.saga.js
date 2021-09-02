import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* classesSaga(){
    yield takeEvery('FETCH_CLASSES', fetchClasses);

}

function* fetchClasses(){
    try {
        const response = yield axios.get('/api/class');
        yield put({ type: 'SET_CLASSES', payload: response.data});
    } catch (error) {
        console.log('Error GETting teachers classes'), error;
    }
}

export default classesSaga;