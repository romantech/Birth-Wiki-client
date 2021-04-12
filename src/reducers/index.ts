import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';

const rootReducer = combineReducers({
  dataReducer,
  loginReducer,
  userInfoReducer,
});

export default rootReducer;
