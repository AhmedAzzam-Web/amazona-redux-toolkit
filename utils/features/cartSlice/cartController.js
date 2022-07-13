import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addAndUpdateItem: (state, { payload }) => {
      let newItem = payload;
      const existItem = state.cartItems && state.cartItems.find((item) => item._id === payload._id);

      state.cartItems = existItem ? state.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cartItems, newItem]
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter(item => item._id !== payload._id)
    },
    clearCart: (state) => {
      state.cartItems = []
    }
  },
})

export const { addAndUpdateItem, removeItem, clearCart } = cartSlice.actions
export default cartSlice.reducer