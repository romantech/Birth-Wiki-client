import { UserInfo } from '../types/index';
export const CREATE_RECORD = 'CREATE_RECORD' as const;
export const REMOVE_RECORD = 'REMOVE_RECORD' as const;
export const SET_CARD_LISTS = 'SET_CARD_LISTS' as const;
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_IS_LOGIN = 'SET_IS_LOGIN';
export const SET_IS_SIDEBAR = 'SET_IS_SIDEBAR';
export const SET_IS_SIGNUP = 'SET_IS_SIGNUP';

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
export const createRecord = () => ({
  type: CREATE_RECORD,
  payload: {},
});

export const removeRecord = () => ({
  type: REMOVE_RECORD,
  payload: {},
});

export const setCardLists = () => ({
  type: SET_CARD_LISTS,
  payload: {},
});
export const setIsSidbar = (isSidebar: boolean) => {
  return {
    type: SET_IS_SIDEBAR,
    payload: isSidebar,
  };
};

export const setIsSignup = (isSignup: boolean) => {
  return {
    type: SET_IS_SIGNUP,
    payload: isSignup,
  };
};
export type CounterAction =
  | ReturnType<typeof createRecord>
  | ReturnType<typeof removeRecord>
  | ReturnType<typeof setCardLists>;
