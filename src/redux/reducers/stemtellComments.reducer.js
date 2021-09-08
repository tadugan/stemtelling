const stemtellComments = (state = [], action) => {
   switch (action.type) {
      case 'SET_STEMTELL_COMMENTS':
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling the comments of a specific STEMtell
// called on the "StemtellDetails" page
export default stemtellComments;