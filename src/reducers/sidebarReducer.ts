import { SET_IS_SIDEBAR } from '../actions/index';
import initialState from './initialState';

const sidebarReducer = (state = initialState, action: any) => {
  console.log('sidebarReducer', state, action.type);
  switch (action.type) {
    case SET_IS_SIDEBAR:
      return { ...state, isSidebar: action.payload };
    default:
      return state;
  }
};

export default sidebarReducer;
