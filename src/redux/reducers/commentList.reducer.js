const commentList = (state = [], action) => {
    switch (action.type) {
      case 'SET_COMMENTLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default commentList;
  