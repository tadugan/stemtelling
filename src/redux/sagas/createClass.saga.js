import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";


// function to create a class
// called on a class list page
function* createClass(action) {
   try {
      const response = yield axios.post(`/api/class`, action.payload);
      yield put({type: 'FETCH_CLASSES'});
   }
   catch(error){
      console.log('Error with createClass in createClass.saga.js:', error);
   };
};


function* createClassSaga() {
   yield takeEvery('CREATE_CLASS', createClass);
};


export default createClassSaga;