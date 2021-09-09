const imageReducer = (state = '', action) => {
    switch (action.type) {
       case 'SET_IMAGE_REDUCER':
          return action.payload;
       default:
          return state;
    };
 };
 
 export default imageReducer;