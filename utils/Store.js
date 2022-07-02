import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice/cartController'
import userReudcer from './features/userSlice/userController'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
}

const persistCart = persistReducer(persistConfig, cartReducer)
const persistUser = persistReducer(persistConfig, userReudcer)

export const store = configureStore({
  reducer: {
    cart: persistCart,
    user: persistUser,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})