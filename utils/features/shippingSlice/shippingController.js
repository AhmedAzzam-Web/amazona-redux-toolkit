import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingData: null
}

export const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    fillShippingData: (state, { payload }) => {
      state.shippingData = payload;
    },
    removeShippingData: (state) => {
      state.shippingData = {}
    }
  },
})

export const { fillShippingData, removeShippingData } = shippingSlice.actions
export default shippingSlice.reducer