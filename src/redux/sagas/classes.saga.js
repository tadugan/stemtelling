import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";


// function to get all classes that the current logged in user is in
// called when 
function* fetchClasses() {
   try {
      const response = yield axios.get('/api/class');
      yield put({ type: 'SET_CLASSES', payload: response.data});
   }
    catch (error) {
      console.log('Error with fetchClasses in classes.saga.js:', error);
   };
};

// function for getting all STEMtells associated with a specific class
// called on the user homepage in order to only display STEMtells that are from classes the user is in
function* fetchClassStemTells() {
   try {
      const response = yield axios.get('/api/stemtell/homefeed');
      yield put({ type: 'SET_STEMTELLS', payload: response.data});
   }
   catch (error) {
      console.log('Error with fetchClassStemTells in classes.saga.js:', error);
   };
};


function* classesSaga(){
    yield takeEvery('FETCH_CLASSES', fetchClasses);
    yield takeEvery('FETCH_USER_FEED', fetchClassStemTells);
};


export default classesSaga;