import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* commentSaga(){
    yield takeEvery('GET_COMMENTLIST', getComments);
}

function* getComments() {
    try {
        const response = yield axios.get('/api/comment');
        yield put({ type: 'SET_COMMENTLIST', payload: response.data});
    } catch (error) {
        console.log('Error GETting user comments on STEMtell', error);
    }
}

export default commentSaga;