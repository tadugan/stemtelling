import { takeEvery, put } from "@redux-saga/core/effects";
import axios from "axios";

function* stemtellSaga(){
    yield takeEvery("FETCH_STEMTELLS", fetchAllStemTells);
    yield takeEvery("FETCH_USER_STEMTELLS", fetchUserStemTells);
    yield takeEvery("GET_STEMTELL", getStemtell);
    yield takeEvery("FETCH_STEM_DETAILS", getStemDetails);
};

function* fetchAllStemTells(){
    try {
        // const userClasses = action.payload;
        const stemtells = yield axios.get("/api/stemtell");
        yield put({type: "SET_STEMTELLS", payload: stemtells.data});
    } catch(err){
        console.log("get all stemtells error", err);
    };
};

function* fetchUserStemTells(action){
   try {
      const profileID = action.payload;
      const stemtells = yield axios.get("/api/stemtell/userstemtells", { params: { profileID } });
      yield put({type: "SET_USER_STEMTELLS", payload: stemtells.data});
   } catch(err){
      console.log("get user stemtells error", err);
   };
};

function* getStemtell(action){
   try {
      const stemtellID = action.payload;
      const stemtell = yield axios.get("/api/stemtell/getstemtell", { params: { stemtellID } });
      yield put({type: "SET_STEMTELL", payload: stemtell.data[0]});
   } catch(err){
      console.log("get stemtell to edit error", err);
   };
};

function* getStemDetails(action){
   try {
      const stemtellID = action.payload;
      const response = yield axios.get('/api/stemtell/details', { params: { stemtellID } });
      yield put({ type: 'SET_STEM_DETAILS', payload: response.data[0] });
   }
   catch (error) {
      console.log("error in FETCHING stemdetails:", error);
   };
   
}

export default stemtellSaga;