const selectedTagReducer = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TAG_TO_STEMTELL':
        return [...state, action.payload];
      case 'REMOVE_TAG_FROM_STEMTELL':
        const filteredState = state.filter(tag => tag.id !== action.payload.id)
        return filteredState;
      default:
        return state;
    }
  };

  export default selectedTagReducer;