import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shippingData: {
    name: '',
    city: '',
    address: '',
    postal: '',
    country: '',
  },
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