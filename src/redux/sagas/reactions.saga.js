import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


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
      console.log('Error with addReaction in reaction.saga.js:', error);
   };
};


function* deleteReaction(action){
   yield axios.delete(`/api/reaction/${action.payload}`);
   yield put({type: 'GET_STEMTELL_REACTIONS', payload: action.payload.stemtell_id});
};


function* reactionSaga(){
   yield takeEvery('GET_STEMTELL_REACTIONS', getStemReactions);
   yield takeEvery('ADD_REACTION', addReaction);
   yield takeEvery('DELETE_REACTION', deleteReaction);
};


export default reactionSaga;