import { SET_IS_LOGIN } from '../actions/index';
import initialState from './initialState';

// 이니셜 상태 임포트

const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IS_LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
};
// 리듀서 쓰고 내보내기
export default loginReducer;
