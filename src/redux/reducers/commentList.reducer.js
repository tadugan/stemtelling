const commentList = (state = [], action) => {
   switch (action.type) {
      case 'SET_COMMENTLIST':
         return action.payload;
      default:
         return state;
   };
};


// reducer for handling comments
// called on when loading all comments for a specific STEMtell
export default commentList;