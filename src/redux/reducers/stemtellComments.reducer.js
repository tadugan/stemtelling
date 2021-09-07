const stemtellComments = (state = [], action) => {
    switch (action.type) {
      case 'SET_STEMTELL_COMMENTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default stemtellComments;
  