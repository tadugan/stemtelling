import { put, takeEvery, call } from "redux-saga/effects";
import axios from "axios";


// function to get all classes that the current logged in user is in
// called when 
function* fetchClasses() {
   try {
      const response = yield axios.get('/api/class');
      yield put({ type: 'SET_CLASSES', payload: response.data});
   }
   catch (error) {
      console.log('Error with fetchClasses in classes.saga.js:', error);
   };
};


// function for getting all classes associated with a specific user
// called on the edit profile page
function* getUserClasses(action) {
   const user = action.payload;
   try {
      const response = yield axios.get(`/api/class/userclasses/${user}`);
      yield put({type: 'SET_USER_CLASSES', payload: response.data});
   }
   catch (error) {
      console.log("Error with getUserClasses in classes.saga.js:", error);
   };
};


// function for getting all STEMtells associated with a specific class
// called on the user homepage in order to only display STEMtells that are from classes the user is in
function* fetchClassStemTells() {
   try {
      const response = yield axios.get('/api/stemtell/homefeed');
      yield put({ type: 'SET_STEMTELLS', payload: response.data});
   }
   catch (error) {
      console.log('Error with fetchClassStemTells in classes.saga.js:', error);
   };
};


// function for updating a class
// called on class list page
function* editClass(action) {
   try {
      yield call(axios.put, `/api/class/update`, action.payload);
   }
   catch (error) {
      console.log('Error with editClass in classes.saga.js:', error);
   };
};


// function for leaving a specific class
// called on the edit profile page
function* leaveClass(action) {
   const class_code = action.payload.code;
   try {
      yield axios.delete('/api/class/leaveclass', {params: {class_code} });
   }
   catch (error) {
      console.log('Error with leaveClass in classes.saga.js:', error);
   };
};


function* joinClass(action) {
   let classCodesArray = [];
   let allClassCodesArray = [];
   const user = action.payload.user_id;
   const classToJoin = Number(action.payload.class_code);
   try {
      yield put({ type: 'CLEAR_CLASS_ERROR' });
      const response = yield axios.get('/api/class/userclasses', {params: { user } });
      for (let x of response.data) {classCodesArray.push(x.code)};
      const allCodesResponse = yield axios.get('/api/class/allclasses');
      for (let y of allCodesResponse.data) {allClassCodesArray.push(y.code)};
      for (let z of allClassCodesArray) {
         if (z !== classToJoin) {
            yield put({ type: 'INVALID_CODE' });
         }
         else if (z == classToJoin) {
            yield put({ type: 'CLEAR_CLASS_ERROR' });
            for (let n of classCodesArray) {
               if (n == classToJoin) {
                  yield put({ type: 'ALREADY_IN_CLASS' });
                  return false;
               }
               else if (n !== classToJoin) {
                  confirmClassToJoin = classToJoin;
               };
            };
            yield axios.post('/api/class/joinclass', {class_code: classToJoin});
            return false;
         };
      };
   }
   catch (error) {
      console.log('Error with joinClass in classes.saga.js:', error);
   };
};
 

function* classesSaga(){
   yield takeEvery('FETCH_CLASSES', fetchClasses);
   yield takeEvery('FETCH_USER_FEED', fetchClassStemTells);
   yield takeEvery("EDIT_CLASS", editClass);
   yield takeEvery("GET_USER_CLASSES", getUserClasses);
   yield takeEvery("LEAVE_CLASS", leaveClass);
   yield takeEvery('JOIN_CLASS', joinClass);
};


export default classesSaga;