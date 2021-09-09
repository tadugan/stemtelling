import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submitNewTags(action) {
    try {
        yield axios.post('/api/tag/profile', action.payload);
    } 
    catch (error) {
        console.log('Error submitting new STEMtell', error);
    }
}

function* addTagsSaga() {
    yield takeLatest('SUBMIT_NEW_PROFILE_TAGS', submitNewTags);
  }

export default addTagsSaga;