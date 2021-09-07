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
    try {
        
        const response = yield axios.get('/api/class');
        console.log(response, "this is the class GET response");
        const userClasses = response.data
        console.log("*****THESE are the user classes:", userClasses);
        let classArray = [];
        for( const eachClass of userClasses){
            classArray.push(eachClass.id)
        } console.log("*********array of class ids", classArray);
        const classIds = yield axios.get('/api/stemtell', {params: [classArray]});
        console.log(classIds, "@#$%^) THIS IS CLASS ID RESPONSE")
    } catch (error) {
        console.log('Error GETting classes'), error;
    }
}

export default classesSaga;

//need to get stemtells using class response