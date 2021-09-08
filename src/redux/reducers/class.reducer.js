const classes = (state = [], action) => {
   switch (action.type){
      case "SET_CLASSES":
         return action.payload;
      default:
         return state;
   };
};


// reducer for setting the classes a user is in
// called on
export default classes;