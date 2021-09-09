const stemtellReactions = (state = [], action) => {
    switch (action.type) {
       case 'SET_STEMTELL_REACTIONS':
          return action.payload;
       default:
          return state;
    };
 };
 
 
 // reducer for handling the comments of a specific STEMtell
 // called on the "StemtellDetails" page
 export default stemtellReactions;