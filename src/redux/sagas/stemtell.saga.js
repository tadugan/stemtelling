import { takeEvery, put } from "@redux-saga/core/effects";
import axios from "axios";

function* stemtellSaga(){
    yield takeEvery("FETCH_STEMTELLS", fetchAllStemTells);
    yield takeEvery("FETCH_USER_STEMTELLS", fetchUserStemTells);
}

function* fetchAllStemTells(){
    try {
        const stemtells = yield axios.get("/api/stemtell");
        console.log("get all stemtells:", stemtells.data);
        yield put({type: "SET_STEMTELLS", payload: stemtells.data});
    } catch(err){
        console.log("get all stemtells error", err);
    }
}

function* fetchUserStemTells(action){
   try {
      const profileID = action.payload;
      const stemtells = yield axios.get("/api/stemtell/userstemtells", { params: { profileID } });
      console.log("get user stemtells:", stemtells.data);
      yield put({type: "SET_USER_STEMTELLS", payload: stemtells.data});
   } catch(err){
      console.log("get user stemtells error", err);
   }
}

export default stemtellSaga;