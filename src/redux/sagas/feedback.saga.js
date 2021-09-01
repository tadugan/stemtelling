import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* feedbackSaga(){
    yield takeEvery('GET_FEEDBACK', getFeedback);
}

function* getFeedback() {
    try {
        const response = yield axios.get('/api/comment/feedback');
        yield put({ type: 'SET_FEEDBACK', payload: response.data});
    } catch (error) {
        console.log('Error GETting teacher feedback', error);
    }
}

export default feedbackSaga;