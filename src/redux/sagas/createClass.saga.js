import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* createClass(action) {
    try {
        const response = yield axios.post(`/api/class`, action.payload);
        yield put({type: 'FETCH_CLASSES'});
    }
    catch(error){
        console.log('POST class error', error);
    }
}

function* createClassSaga() {
    yield takeEvery('CREATE_CLASS', createClass);
  }

export default createClassSaga;