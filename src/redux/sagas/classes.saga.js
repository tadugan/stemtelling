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


// main export for this file
function* classesSaga() { 
   yield takeEvery('FETCH_CLASSES', fetchClasses);
};


export default classesSaga;