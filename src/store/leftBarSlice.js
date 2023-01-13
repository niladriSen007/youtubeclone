import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShown:false,
}

export const leftBarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    show: (state) => {
      state.isShown = !state.isShown
    },
    hide: (state) => {
      state.isShown = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, hide } = leftBarSlice.actions

export default leftBarSlice.reducer