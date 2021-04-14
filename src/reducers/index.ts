import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';
import sidebarReducer from './sidebarReducer';

const rootReducer = combineReducers({
  dataReducer,
  loginReducer,
  userInfoReducer,
  sidebarReducer,
});

export default rootReducer;
