import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  paymentMethod: null,
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updatePaymentMethod: (state, { payload }) => {
      state.paymentMethod = payload
    },
    removePaymentMethod: (state, { payload }) => {
      state.paymentMethod = null
    },
  },
})

export const { updatePaymentMethod, removePaymentMethod } = paymentSlice.actions
export default paymentSlice.reducer