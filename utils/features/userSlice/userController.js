import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.userInfo = payload;
    }
  },
})

export const { addUser } = userSlice.actions
export default userSlice.reducer