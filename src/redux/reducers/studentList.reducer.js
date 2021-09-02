const studentList = (state = [], action) => {
  console.log('This is the studentlist Reducer', state);
    switch (action.type) {
      case 'SET_STUDENTLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default studentList;