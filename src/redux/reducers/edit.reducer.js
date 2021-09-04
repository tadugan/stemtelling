// import { combineReducers } from "redux";

const stemtells = (state = [], action) => {
   switch (action.type){
        case "SET_STEMTELL":
           return action.payload;
       default:
           return state;
   }
};

export default stemtells;