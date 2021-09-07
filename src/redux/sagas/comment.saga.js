import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* commentSaga(){
    yield takeEvery('GET_COMMENTLIST', getComments);
    yield takeEvery('ADD_COMMENT', addComment);    
}

function* addComment(action){
    try{
         yield call(axios.post, '/api/comment', action.payload);
         console.log('in addComment saga:',action.payload);
         yield put({type: 'GET_COMMENTLIST'});
    } catch(error){
        console.log('unable to add comment', error);
    }
}

function* getComments(action) {
    try {
        const response = yield axios.get(`/api/comments/stemcomments/${action.payload}`);
        yield put({ type: 'SET_COMMENTLIST', payload: response.data});
    } catch (error) {
        console.log('Error GETting user comments on STEMtell', error);
    }
}

export default commentSaga;