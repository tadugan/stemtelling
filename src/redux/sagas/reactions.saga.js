// function to get all reactions associated with a specific STEMtell.

import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


// function* getAllReactions(){
//     try {
//         const response = yield axios.get(`/api/reaction`);
//         yield put({ type: 'SET_REACTIONS', payload: response.data});
//      }
//      catch (error) {
//         console.log('Error with getAllReactions in reactions.saga.js:', error);
//      };
// }

// called when loading a STEMtell

function* getStemReactions(action) {
    try {
       const response = yield axios.get(`/api/reaction/${action.payload}`);
       yield put({ type: 'SET_STEMTELL_REACTIONS', payload: response.data});
    }
    catch (error) {
       console.log('Error with getStemReactions in reactions.saga.js:', error);
    };
 };
 
 //add reaction
function* addReaction(action) {
   try{
      yield axios.post('/api/reaction', action.payload);
      yield put({type: 'GET_STEMTELL_REACTIONS', payload: action.payload.stemtell_id});
   }
   catch (error) {
      console.log('error with addReaction in reaction.saga.js:', error);
   }
};

function* deleteReaction(action){
   yield axios.delete(`/api/reaction/${action.payload}`);
   yield put({type: 'GET_STEMTELL_REACTIONS', payload: action.payload.stemtell_id});
}

 function* reactionSaga(){
    yield takeEvery('GET_STEMTELL_REACTIONS', getStemReactions);
    yield takeEvery('ADD_REACTION', addReaction);
    yield takeEvery('DELETE_REACTION', deleteReaction);
   //  yield takeEvery('GET_REACTIONS', getAllReactions);
 };
 export default reactionSaga;