import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderDetails: null,
}

export const paymentSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    makeOrder: (state, { payload }) => {
      state.orderDetails = payload
    },
  },
})

export const { makeOrder } = paymentSlice.actions
export default paymentSlice.reducer