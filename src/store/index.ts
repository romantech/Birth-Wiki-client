import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { persistStore } from 'redux-persist';

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default { store, persistor };
