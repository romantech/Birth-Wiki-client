import { SET_IS_SIGNUP } from '../actions/index';
import { SET_IS_EDIT } from '../actions/index';
import initialState from './initialState';

const signupReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IS_SIGNUP:
      return { ...state, isSignup: action.payload };
    case SET_IS_EDIT:
      return { ...state, isEdit: action.payload };
    default:
      return state;
  }
};

export default signupReducer;
