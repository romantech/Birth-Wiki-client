import { SET_CARD_LISTS, CounterAction } from '../actions/index';
import { initialState } from './initialstate';

const dataReducer = (state = initialState, action: CounterAction) => {
  switch (action.type) {
    case SET_CARD_LISTS:
      return Object.assign({}, state, {
        data: action.payload,
      });
    default:
      return state;
  }
};

export default dataReducer;
