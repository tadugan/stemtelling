import { put, takeEvery } from "redux-saga/effects";

function* userClassSaga(){
    yield takeEvery('GET_USER_FEED', getUserFeed);
}

function* getUserFeed(){
    try{
        yield put({ type: 'FETCH_CLASSES'})
        
        yield put({ type: 'FETCH_STEMTELLS'})
    } catch (error) {
        console.log('Error getting user feed')
    }
}

export default userClassSaga;