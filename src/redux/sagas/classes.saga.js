import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* classesSaga(){
    yield takeEvery('FETCH_CLASSES', fetchClasses);
    yield takeEvery('FETCH_USER_FEED', fetchClassStemTells)

}

function* fetchClasses(){
    try {
        const response = yield axios.get('/api/class');
        yield put({ type: 'SET_CLASSES', payload: response.data});
    } catch (error) {
        console.log('Error GETting classes'), error;
    }
}

function* fetchClassStemTells(){
    try {
        const response = yield axios.get('/api/class');
        yield axios.get(`/api/stemtell`, response.data)
        console.log(response, "THIS IS RESPONSE")
    } catch (error) {
        console.log('Error GETting classes'), error;
    }
}

export default classesSaga;

//need to get stemtells using class response