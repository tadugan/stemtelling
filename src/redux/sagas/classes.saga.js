import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

function* classesSaga(){
    yield takeEvery('FETCH_CLASSES', fetchClasses);
    yield takeEvery('FETCH_USER_FEED', fetchClassStemTells)

}

function* fetchClasses(){
    try {
        const response = yield axios.get('/api/class');
        yield put({ type: 'SET_CLASSES', payload: response.data});
    } catch (error) {
        console.log('Error GETting classes'), error;
    }
}

function* fetchClassStemTells(){
    try{
        const response = yield axios.get('/api/stemtell/homefeed');
        console.log(response, "this is the fetchClassST response*******")
        yield put({ type: 'SET_STEMTELLS', payload: response.data});
    } catch (error) {
    console.log('Error Getting class stemtells');
}
}

// function* fetchClassStemTells(){
//     try {
        
//         const response = yield axios.get('/api/class');
//         console.log(response, "this is the class GET response");
//         const classList = response.data
//         console.log("*****THESE are the user classes:", classList);
//         let classIds = '';
//         for (let i = 0; i > classList.length; i++) {
//             classIds += classList[i].id;
//             if (i < classList.length - 1) {
//                 classIds += ',';
//             }
//             console.log(classIds, "these are class ids");
//         }
//         const classesIds = yield axios.get(`api/stemtell?classIds=${classIds}`)
//         // console.log(classIds.data, "******** THIS IS response from GET")
//     } catch (error) {
//         console.log('Error GETting classes'), error;
//     }
// }

export default classesSaga;

//need to get stemtells using class response