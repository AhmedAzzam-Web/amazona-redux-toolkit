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
    addItemToCart: (state, { payload }) => {
      let newItem = payload;
      const existItem = state.cart.cartItems.find((item) => item._key === payload._key);

      state.cart.cartItems = existItem ? state.cart.cartItems.map((item) => item._key === existItem._key ? newItem : item) : [...state.cart.cartItems, newItem]

      Cookies.set('cartItems', JSON.stringify(state.cart.cartItems));
    },
    updateCart: (state, { payload }) => {
      console.log(payload)
    },
    removeItem: (state, { payload }) => {
      console.log(payload)
    },
  },
})

export const { addItemToCart, updateCart, removeItem } = cartSlice.actions
export default cartSlice.reducer