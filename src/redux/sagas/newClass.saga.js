import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


function* addClass(action) {
   try {
      yield axios.post(`/api/class/profile`, action.payload);
      yield put({type: 'FETCH_CLASSES'});
   }
   catch(error){
      console.log('Error with addClass in newClass.saga.js:', error);
   };
};


function* newClassSaga() {
   yield takeEvery('JOIN_CLASS', addClass);
};


export default newClassSaga;