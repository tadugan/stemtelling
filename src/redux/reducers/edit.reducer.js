const stemtells = (state = [], action) => {
   switch (action.type){
      case "SET_STEMTELL":
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling details of a specific STEMtell to be edited
// called on when a user attempts to edit a STEMtell on "UserPage"
export default stemtells;