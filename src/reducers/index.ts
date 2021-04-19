import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';
import sidebarReducer from './sidebarReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  dataReducer,
  loginReducer,
  userInfoReducer,
  sidebarReducer,
  signupReducer,
});

export default rootReducer;
