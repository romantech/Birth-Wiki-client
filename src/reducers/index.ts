import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './loginReducer';
import userInfoReducer from './userInfoReducer';
import sidebarReducer from './sidebarReducer';
import signupReducer from './signupReducer';
import guestReducer from './guestReducer';
import saveReducer from './saveReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer', 'userInfoReducer', 'guestReducer'],
};
const rootReducer = combineReducers({
  loginReducer,
  userInfoReducer,
  sidebarReducer,
  signupReducer,
  guestReducer,
  saveReducer,
});

export default persistReducer(persistConfig, rootReducer);
