// import { combineReducers } from "redux";

const profile = (state = [], action) => {
   switch (action.type){
       case "SET_CURRENT_PROFILE":
           return action.payload;
       default:
           return state;
   };
};

export default profile;