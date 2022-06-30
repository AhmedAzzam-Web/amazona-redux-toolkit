import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
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