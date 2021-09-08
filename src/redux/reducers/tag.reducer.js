const tagReducer = (state = [], action) => {
   switch (action.type) {
      case 'SET_TAGS':
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling STEMtags
// called on in "CreateSTEMtell" and "EditSTEMtell"
export default tagReducer;