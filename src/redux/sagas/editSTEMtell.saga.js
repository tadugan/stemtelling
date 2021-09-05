import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveEditedStemtell(action) {
   console.log(action.payload);
   try {
       yield axios.put('/api/stemtell/save', action.payload);
   } catch (error) {
       console.log('Error saving STEMtell', error);
   }
}

function* getExistingTags(action) {
    try {
        console.log('action.payload', action.payload);
        const tagArray = yield axios.get(`/api/stemtell/tags/${action.payload}`);
        yield put({ type: 'ADD_EXISTING_TAGS_TO_STEMTELL', payload: tagArray.data });
    } catch (error) {
        console.log('Error GETting STEMtell tags', error);
    }
}

function* editStemtellSaga() {
    yield takeLatest('SAVE_EDITED_STEMTELL', saveEditedStemtell);
    yield takeLatest('GET_EXISTING_TAGS', getExistingTags);
  }

export default editStemtellSaga;