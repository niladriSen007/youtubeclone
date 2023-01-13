import { configureStore } from '@reduxjs/toolkit'
import leftBarReducer from "./leftBarSlice"
export const store = configureStore({
  reducer: {
    menuBar:leftBarReducer,
  },
})