const studentList = (state = [], action) => {
   switch (action.type) {
      case 'SET_STUDENTLIST':
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling the list of students in a class
// called when a teacher views one of their classes
export default studentList;