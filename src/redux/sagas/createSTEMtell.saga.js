import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// function to add a new STEMtell to the database
// called when a user clicks the "submit" button on the "CreateSTEMtell" page
function* submitNewStemtell(action) {
   try {
      // const imageUrl = yield fetch('/api/upload', {
      //    method: 'POST',
      //    body: JSON.stringify({data: action.payload.image_data}),
      //    headers: {'Content-type': 'application/json'}
      // })
      // console.log('imageUrl in saga', imageUrl); // TODO:
      yield axios.post('/api/stemtell', action.payload);
   }
   catch (error) {
      console.log('Error with submitNewStemtell in createSTEMtell.saga.js:', error);
   };
};

function* createStemtellSaga() {
   yield takeLatest('SUBMIT_NEW_STEMTELL', submitNewStemtell);
};


export default createStemtellSaga;