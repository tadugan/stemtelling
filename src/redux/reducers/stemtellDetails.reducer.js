
const stemtellDetails = (state = {}, action) => {
    switch (action.type){
            case "SET_STEM_DETAILS":
            return action.payload;
        default:
            return state;
    }
};

export default stemtellDetails;