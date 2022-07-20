import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
}

export const paymentSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    makeOrder: (state, { payload }) => {
      state.orders = [...state.orders ,payload]
    },
  },
})

export const { makeOrder } = paymentSlice.actions
export default paymentSlice.reducer