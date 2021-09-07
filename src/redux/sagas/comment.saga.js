import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* commentSaga(){
    yield takeEvery('GET_COMMENTLIST', getComments);
    yield takeEvery('ADD_COMMENT', addComment); 
    yield takeEvery('GET_STEMTELL_COMMENTS', getStemComments);
}

function* getComments() {
    try {
        const response = yield axios.get(`/api/comments`);
        yield put({ type: 'SET_COMMENTLIST', payload: response.data});
    } catch (error) {
        console.log('Error GETting ALL comments', error);
    }
}

function* addComment(action){
    try{
        yield axios.post('/api/comment', action.payload);
        yield put({ type: 'GET_STEMTELL_COMMENTS', payload: action.payload.stemtell_id});
    } catch(error){
        console.log('unable to add comment', error);
    }
}

function* getStemComments(action) {
    try {
        const response = yield axios.get(`/api/comment/stemcomments/${action.payload}`);
        yield put({ type: 'SET_STEMTELL_COMMENTS', payload: response.data});
    } catch (error) {
        console.log('Error GETting comments on STEMtell', error);
    }
}



export default commentSaga;