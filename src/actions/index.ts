export const CREATE_RECORD = 'CREATE_RECORD' as const;
export const REMOVE_RECORD = 'REMOVE_RECORD' as const;
export const SET_CARD_LISTS = 'SET_CARD_LISTS' as const;

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

export type CounterAction =
  | ReturnType<typeof createRecord>
  | ReturnType<typeof removeRecord>
  | ReturnType<typeof setCardLists>;
