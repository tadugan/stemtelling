const userReducer = (state = {}, action) => {
   switch (action.type) {
      case 'SET_USER':
         return action.payload;
      case 'UNSET_USER':
         return {};
      default:
         return state;
   };
};


// reducer for handling setting the currently logged in user
// called on login
export default userReducer;