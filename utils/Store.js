import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice/cartController'
import userReudcer from './features/userSlice/userController'
import shippingReudcer from './features/shippingSlice/shippingController'
import paymentReudcer from './features/paymentSlice/paymentController'
import orderReudcer from './features/orderSlice/order'
import darkReudcer from './features/darkSlice/dark'
import lovedSlice from './features/lovedProductSlice/lovedSlice'
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import autoMergeLevel2 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel2';

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

const reducers = combineReducers({
  cart: cartReducer,
  user: userReudcer,
  shipping: shippingReudcer,
  payment: paymentReudcer,
  order: orderReudcer,
  dark: darkReudcer,
  lovedProducts: lovedSlice,
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }),
})

export const persistor = persistStore(store)