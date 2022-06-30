import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice/cartController'
import userReudcer from './features/userSlice/userController'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReudcer,
  },
})