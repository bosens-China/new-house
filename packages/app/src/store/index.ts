/*
 * 持久化参考以下
 * https://www.npmjs.com/package/reduxjs-toolkit-persist#redux-toolkit-usage
 * https://stackoverflow.com/questions/63761763/how-to-configure-redux-persist-with-redux-toolkit
 */

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import persistStore from 'redux-persist/es/persistStore';
import users from './users';

const reducers = combineReducers({
  users,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
