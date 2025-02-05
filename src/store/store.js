import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import registrationsReducer from '../features/registrationsSlice';
import coachesReducer from '../features/coachesSlice';
import counterReducer from '../features/counterSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['registrations', 'coaches', 'counter']
};

const rootReducer = combineReducers({
  registrations: registrationsReducer,
  coaches: coachesReducer,
  counter: counterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };