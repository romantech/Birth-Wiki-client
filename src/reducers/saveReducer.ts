import { SET_SAVE_MODAL } from '../actions/index';
import initialState from './initialState';

const guestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SAVE_MODAL:
      return { ...state, isSave: action.payload };
    default:
      return state;
  }
};

export default guestReducer;
