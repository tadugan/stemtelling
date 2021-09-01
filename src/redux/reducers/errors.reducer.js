import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your email and password!';
    case 'LOGIN_FAILED':
      return "Oops! The email and password didn't match. Try again!";
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    default:
      return state;
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Enter an email and password!';
   case 'REGISTRATION_PASSWORD_MATCH_ERROR':
      return 'Passwords do not match!';
    case 'REGISTRATION_FAILED':
      return "Oops! That didn't work. The email might already be in use. Try again!";
    default:
      return state;
  }
};

const resetMessage = (state = '', action) => {
   switch (action.type) {
      case 'CLEAR_LINK_ERROR':
         return '';
      case 'INVALID_LINK':
         return 'Invalid Link';
      default:
         return state;
   }
 };

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  resetMessage,
});
