import { UserInfo } from '../types/index';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_IS_LOGIN = 'SET_IS_LOGIN';

export const setUserInfo = (userInfo: UserInfo) => {
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};

export const setIsLogin = (isLogin: boolean) => {
  return {
    type: SET_IS_LOGIN,
    payload: isLogin,
  };
};

// export const setWikiData = (wikiData: []) => {
//   return {
//     type: SET_WIKI_DATA,
//     payload: wikiData,
//   };
// };

// export const setUserData = (userData: []) => {
//   return {
//     type: SET_USER_DATA,
//     payload: userData,
//   };
// };
