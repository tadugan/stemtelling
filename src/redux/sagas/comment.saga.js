import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* commentSaga(){
    yield takeEvery('GET_COMMENTS', getComments);
}

function* getComments() {
    try {
        const response = yield axios.get('/api/comments');
        yield put({ type: 'SET_COMMENTS', payload: response.data});
    } catch (error) {
        console.log('Error GETting user comments on STEMtell', error);
    }
}

export default commentSaga;