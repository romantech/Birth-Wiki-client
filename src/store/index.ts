import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer, composeWithDevTools());
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default { store, persistor };
