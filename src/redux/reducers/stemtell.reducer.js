const stemtells = (state = [], action) => {
   switch (action.type){
      case "SET_STEMTELLS":
         return action.payload;
      case "SET_USER_STEMTELLS":
         return action.payload;
      default:
         return state;
   };
};


// reducer for showing STEMtells
// called on in "Homepage", "UserPage", and "ProfilePage"
export default stemtells;