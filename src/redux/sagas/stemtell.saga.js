import { put, takeEvery } from "@redux-saga/core/effects";
import axios from "axios";


// function for fetching all STEMtells associated with a user
// called on both "ProfilePage" and "UserPage" loads
function* fetchUserStemTells(action) {
   try {
      const profileID = action.payload;
      const stemtells = yield axios.get("/api/stemtell/userstemtells", { params: { profileID } });
      yield put({type: "SET_USER_STEMTELLS", payload: stemtells.data});
   }
   catch (error) {
      console.log("Error with fetchUserStemTells in stemtell.saga.js:", error);
   };
};


function* fetchMyStemTells(action) {
   try {
      const profileID = action.payload;
      const stemtells = yield axios.get("/api/stemtell/mystemtells", { params: { profileID } });
      yield put({type: "SET_USER_STEMTELLS", payload: stemtells.data});
   }
   catch (error) {
      console.log("Error with fetchUserStemTells in stemtell.saga.js:", error);
   };
};


// function for getting a specific STEMtell
// called for when a user clicks the "Edit" button on a STEMtell on their profile page
function* getStemtell(action) {
   try {
      const stemtellID = action.payload;
      const stemtell = yield axios.get("/api/stemtell/getstemtell", { params: { stemtellID } });
      yield put({type: "SET_STEMTELL", payload: stemtell.data[0]});
   }
   catch (error) {
      console.log("Error with getStemtell in stemtell.saga.js:", error);
   };
};


// function for getting information associated with a specific STEMtell
// called when a user clicks on a STEMtell on their homepage
function* getStemDetails(action) {
   try {
      const response = yield axios.get(`/api/stemtell/details/${action.payload}`);
      yield put({ type: 'SET_STEM_DETAILS', payload: response.data[0] });
   }
   catch (error) {
      console.log("Error with getStemDetails in stemtell.saga.js:", error);
   };
};


// function for getting all STEMtells currently in the database
// called on Homepage load
function* fetchAllStemTells() {
   try {
      const stemtells = yield axios.get("/api/stemtell");
      yield put({type: "SET_STEMTELLS", payload: stemtells.data});
   }
   catch (error) {
      console.log("Error with fetchAllStemTells in stemtell.saga.js:", error);
   };
};


// function for deleting a specific STEMtell
// called on "UserPage"
function* deleteStemtell(action) {
   try {
      const response = yield axios.delete(`/api/stemtell/delete/${action.payload.id}`)
   }
   catch (error) {
      console.log("Error with deleteStemtell in stemtell.saga.js:", error);
   };
};


// main export for this file
function* stemtellSaga() {
   yield takeEvery("FETCH_STEMTELLS", fetchAllStemTells);
   yield takeEvery("FETCH_USER_STEMTELLS", fetchUserStemTells);
   yield takeEvery("FETCH_MY_STEMTELLS", fetchMyStemTells);
   yield takeEvery("GET_STEMTELL", getStemtell);
   yield takeEvery("FETCH_STEMTELL_DETAILS", getStemDetails);
   yield takeEvery("DELETE_STEMTELL", deleteStemtell);
};


export default stemtellSaga;