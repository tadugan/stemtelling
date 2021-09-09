// function to get all reactions associated with a specific STEMtell.

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// called when loading a STEMtell
function* getStemReactions(action) {
    console.log('this is action.payload in reaction saga:', action.payload);
    try {
       const response = yield axios.get(`/api/reaction/${action.payload}`);
       yield put({ type: 'SET_STEMTELL_REACTIONS', payload: response.data});
    }
    catch (error) {
       console.log('Error with getStemReactions in reactions.saga.js:', error);
    };
 };
 
 function* reactionSaga(){
    yield takeEvery('GET_STEMTELL_REACTIONS', getStemReactions);
 };
 export default reactionSaga;