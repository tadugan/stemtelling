const imageReducer = (state = '', action) => {
    switch (action.type) {
       case 'SET_IMAGE_REDUCER':
          return action.payload;
       case 'CLEAR_IMAGE_REDUCER':
          return '';
       default:
          return state;
    };
 };
 
 export default imageReducer;