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
      const response = yield axios.get('/api/class/userclasses', {params: { user } });
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

//function for updating a class
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
   const classInfo = action.payload.id;
   try {
      yield axios.delete('/api/class/leaveclass', {params: {classInfo} });
   }
   catch (error) {
      console.log('Error with leaveClass in classes.saga.js:', error);
   };
};

function* joinClass(action) {
   let classCodesArray = [];
   let allClassCodesArray = [];
   const user = action.payload.user_id;
   const classToJoin = action.payload.class_code;
   try {
      const response = yield axios.get('/api/class/userclasses', {params: { user } });
      for (let x of response.data) {classCodesArray.push(x.code)};
      const allCodesResponse = yield axios.get('/api/class/allclasses');
      for (let y of allCodesResponse.data) {allClassCodesArray.push(y.code)};
      console.log(classCodesArray);
      console.log(allClassCodesArray);
      // for (let y = 0; y < classCodesArray.length; y++) {
      //    if (classCodesArray[y] == classToJoin) {
      //       alert ("You are already in this class");
      //       return false;
      //    }
      //    else if (classCodesArray[y] != classToJoin) {
      //       const check = yield axios.get('/api/class/allclasses');
      //       for (let z = 0; z < check.data.length; z++) {
      //          console.log(check.data[z].code);
      //          if (check.data[z] != classToJoin) {
      //             console.log("invalid class code");
      //          }
      //          else {
      //             console.log("valid class code");
      //             return false;
      //          }
      //       }
      //    }
      //    else {
      //       alert("Unknown error");
      //       return false;
      //    };
      // };
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