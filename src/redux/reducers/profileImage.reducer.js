const profileImageReducer = (state = '', action) => {
    switch (action.type) {
       case 'SET_PROFILE_IMAGE_REDUCER':
          return action.payload;
        case 'CLEAR_PROFILE_IMAGE_REDUCER':
          return '';
       default:
          return state;
    };
 };
 
 export default profileImageReducer;