import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: {
    cartItems: []
  }
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addAndUpdateItem: (state, { payload }) => {
      let newItem = payload;
      const existItem = state.cart.cartItems.find((item) => item._id === payload._id);

      state.cart.cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem]
    },
    removeItem: (state, { payload }) => {
      state.cart.cartItems = state.cart.cartItems.filter(item => item._id !== payload._id)
    },
  },
})

export const { addAndUpdateItem, removeItem } = cartSlice.actions
export default cartSlice.reducer