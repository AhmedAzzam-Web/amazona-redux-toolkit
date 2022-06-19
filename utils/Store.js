import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice/cartController'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})