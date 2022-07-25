import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDark: false
}

export const darkSlice = createSlice({
  name: 'dark',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark
    }
  },
})

export const { toggleDarkMode } = darkSlice.actions
export default darkSlice.reducer