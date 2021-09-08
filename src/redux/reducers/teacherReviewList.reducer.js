const teacherReviewListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TEACHER_REVIEW_LIST':
        return action.payload;
      default:
        return state;
    }
  };

  export default teacherReviewListReducer;