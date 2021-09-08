import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import tags from './tag.reducer';
import selectedTags from './selectedtags.reducer';
import commentList from './commentList.reducer';
import stemtells from './stemtell.reducer';
import profile from './profile.reducer';
import classes from './class.reducer';
import feedback from './feedback.reducer';
import studentList from './studentList.reducer';
import stemtellDetails from './stemtellDetails.reducer';
import stemtellComments from './stemtellComments.reducer';
import teacherReviewList from './teacherReviewList.reducer';


const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  tags, // contains a list of all available tags
  selectedTags, // contains tags chosen to be added to a new STEMtell
  commentList,
  stemtells,
  profile,
  classes,
  feedback,
  studentList,
  stemtellDetails,
  stemtellComments,
  teacherReviewList, // contains an array of STEMtell objects that have not yet been approved
});


export default rootReducer;