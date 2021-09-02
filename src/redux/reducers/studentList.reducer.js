const studentListReducer = (state = [], action) => {
  console.log('This is the studentlist Reducer', action.payload);
    switch (action.type) {
      case 'SET_STUDENTLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default studentListReducer;