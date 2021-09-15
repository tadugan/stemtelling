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
import editStemtellSaga from './editSTEMtell.saga';
import teacherReviewListSaga from './teacherReviewList.saga';
import resetPasswordSaga from './resetpassword.saga';
import addTagsSaga from './newProfile.saga';
import reactionSaga from './reactions.saga';
import createClassSaga from './createClass.saga';


export default function* rootSaga() {
   yield all([
      loginSaga(),
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
      editStemtellSaga(),
      teacherReviewListSaga(),
      addTagsSaga(),
      reactionSaga(),
      createClassSaga(),
   ]);
};