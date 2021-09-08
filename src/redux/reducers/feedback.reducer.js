const FeedbackReducer = (state = [], action) => {
   switch (action.type) {
      case 'SET_FEEDBACK':
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling teacher feedback for a specific STEMtell
// called on the "UserPage"
export default FeedbackReducer;