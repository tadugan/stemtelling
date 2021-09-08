const profile = (state = [], action) => {
   switch (action.type){
      case "SET_CURRENT_PROFILE":
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling the current profile page
// called on in "ProfilePage"
export default profile;