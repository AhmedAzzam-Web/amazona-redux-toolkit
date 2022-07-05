import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.userData = payload;
    },
    removeUser: (state) => {
      state.userData = null;
    },
  },
})

export const { addUser, removeUser } = userSlice.actions
export default userSlice.reducer