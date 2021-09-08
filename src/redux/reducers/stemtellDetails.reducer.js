const stemtellDetails = (state = {}, action) => {
   switch (action.type) {
      case "SET_STEM_DETAILS":
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling all the info of a specific STEMtell
// called on the "StemtellDetails" page
export default stemtellDetails;