import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getAllTags() {
    try {
        const allTags = yield axios.get('/api/tag');
        yield put({ type: 'SET_TAGS', payload: allTags.data});
    } catch (error) {
        console.log('Error getting all tags', error);
    }
}

function* tagSaga() {
    yield takeLatest('GET_ALL_TAGS', getAllTags);
  }

export default tagSaga;