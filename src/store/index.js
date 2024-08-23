import { configureStore } from "@reduxjs/toolkit";
import wordsSlice from "./slice/words";
import wordsReducer from './slice/words'

export const store = configureStore({
  reducer: {
    words: wordsReducer,
  },
});