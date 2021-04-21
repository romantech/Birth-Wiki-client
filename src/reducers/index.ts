import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';
import sidebarReducer from './sidebarReducer';
import signupReducer from './signupReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer', 'userInfoReducer'],
};
const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
  sidebarReducer,
  signupReducer,
});

export default persistReducer(persistConfig, rootReducer);
