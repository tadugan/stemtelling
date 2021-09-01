const resetPasswordReducer = (state = {}, action) => {
   switch (action.type) {
     case 'SET_UUID':
       return action.payload;
     case 'UNSET_UUID':
       return {};
     default:
       return state;
   }
 };

 export default resetPasswordReducer;
 