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
    }
  },
})

export const { updatePaymentMethod } = paymentSlice.actions
export default paymentSlice.reducer