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


const rootReducer = combineReducers({
   errors,
   user,
   tags,
   selectedTags,
   commentList,
   stemtells,
   profile,
   classes,
   feedback,
   studentList,
   stemtellDetails,
   stemtellComments,
});


export default rootReducer;