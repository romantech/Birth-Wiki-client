import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import dataReducer from './dataReducer';
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
  dataReducer,
  loginReducer,
  userInfoReducer,
  sidebarReducer,
  signupReducer,
});

export default persistReducer(persistConfig, rootReducer);

// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import newProjectReducer from './newProjectReducer';
// import userInfoReducer from './userInfoReducer';
// import loginReducer from './loginReducer';
// import tagDataReducer from './tagDataReducer';
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['loginReducer', 'userInfoReducer'],
// };
// const rootReducer = combineReducers({
//   newProjectReducer,
//   userInfoReducer,
//   loginReducer,
//   tagDataReducer,
// });
// export default persistReducer(persistConfig, rootReducer);
