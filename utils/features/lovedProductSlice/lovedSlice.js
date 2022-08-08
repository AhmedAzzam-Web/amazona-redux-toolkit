import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lovedProducts: []
}

export const lovedSlice = createSlice({
  name: 'lovedProducts',
  initialState,
  reducers: {
    addLovedProduct: (state, { payload }) => {
      let newItem = payload;
      const existItem = state.lovedProducts && state.lovedProducts.find((item) => item._id === payload._id);

      state.lovedProducts = existItem ? state.lovedProducts.map((item) => item._id === existItem._id ? newItem : item) : [...state.lovedProducts, newItem]
    }
  },
})

export const { addLovedProduct } = lovedSlice.actions
export default lovedSlice.reducer