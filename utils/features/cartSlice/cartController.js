import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
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

      Cookies.set('cartItems', JSON.stringify(state.cart.cartItems));
    },
    removeItem: (state, { payload }) => {
      state.cart.cartItems = state.cart.cartItems.filter(item => item._id !== payload._id)
      Cookies.set('cartItems', JSON.stringify(state.cart.cartItems));
    },
  },
})

export const { addAndUpdateItem, removeItem } = cartSlice.actions
export default cartSlice.reducer