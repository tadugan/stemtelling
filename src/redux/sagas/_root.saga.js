import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import createStemtellSaga from './createSTEMtell.saga';
import tagSaga from './tag.saga';
import commentSaga from './comment.saga';
import stemtellSaga from './stemtell.saga';
import classesSaga from './classes.saga';
import feedbackSaga from './feedback.saga';
import studentListSaga from './studentList.saga';
import deleteStudentSaga from './deleteStudent.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga
import resetPasswordSaga from './resetpassword.saga';
import newClassSaga from './newClass.saga';
import addTagsSaga from './newProfile.saga';

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    createStemtellSaga(),
    tagSaga(),
    commentSaga(),
    resetPasswordSaga(),
    stemtellSaga(),
    classesSaga(),
    feedbackSaga(),
    studentListSaga(),
    deleteStudentSaga(),
    newClassSaga(),
    addTagsSaga(),
  ]);
}
