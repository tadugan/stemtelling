import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* submitNewStemtell(action) {
    try {
        yield axios.post('/api/stemtell', action.payload);
    } catch (error) {
        console.log('Error submitting new STEMtell', error);
    }
}

function* saveEditedStemtell(action) {
   console.log(action.payload);
   try {
       yield axios.post('/api/stemtell/save', action.payload);
   } catch (error) {
       console.log('Error saving STEMtell', error);
   }
}

function* createStemtellSaga() {
    yield takeLatest('SUBMIT_NEW_STEMTELL', submitNewStemtell);
    yield takeLatest('SAVE_EDITED_STEMTELL', saveEditedStemtell);
  }

export default createStemtellSaga;