import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* commentSaga(){
    yield takeEvery('GET_COMMENTLIST', getComments);
    yield takeEvery('ADD_COMMENT', addComment);    
}

function* addComment(action){
    try{
         yield call(axios.post, '/api/comment', action.payload);
         yield put({type: 'ADD_COMMENT'});
    } catch(error){
        console.log('unable to add comment', error);
    }
}

function* getComments() {
    try {
        const response = yield axios.get('/api/comment');
        yield put({ type: 'SET_COMMENTLIST', payload: response.data});
    } catch (error) {
        console.log('Error GETting user comments on STEMtell', error);
    }
}

export default commentSaga;