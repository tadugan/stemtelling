import { takeEvery, put } from "@redux-saga/core/effects";
import axios from "axios";

function* stemtellSaga(){
    yield takeEvery("FETCH_STEMTELLS", fetchAllStemTells);
    yield takeEvery("FETCH_USER_STEMTELLS", fetchUserStemTells);
    yield takeEvery("EDIT_STEMTELL", editStemtell);
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

function* editStemtell(action){
   try {
      const stemtellID = action.payload;
      const stemtell = yield axios.get("/api/stemtell/editstemtell", { params: { stemtellID } });
      console.log('returned:', stemtell.data);
      yield put({type: "SET_EDIT_STEMTELL", payload: stemtell.data});
      return(stemtell.data);
   } catch(err){
      console.log("get stemtell to edit error", err);
   };
};

export default stemtellSaga;