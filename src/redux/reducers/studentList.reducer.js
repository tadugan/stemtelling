const studentList = (state = [], action) => {
    switch (action.type) {
      case 'SET_STUDENTLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default studentList;