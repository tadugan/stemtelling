// import { combineReducers } from "redux";

const stemtells = (state = [], action) => {
    switch (action.type){
        case "SET_STEMTELLS":
            return action.payload;
         case "SET_USER_STEMTELLS":
            return action.payload;
            case "SET_STEM_DETAILS":
                console.log('STEM DETAILS:', action.payload)
            return action.payload;
        default:
            return state;
    }
};

export default stemtells;