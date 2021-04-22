import { SET_GUEST, SET_GUEST_MODAL } from '../actions/index';
import initialState from './initialState';

const guestReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_GUEST:
      return { ...state, isGuest: action.payload };
    case SET_GUEST_MODAL:
      return { ...state, isGuestModal: action.payload };
    default:
      return state;
  }
};

export default guestReducer;
