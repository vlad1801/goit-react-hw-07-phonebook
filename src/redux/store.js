import { phoneBookReducer } from './phoneBookReducer';
import { filterReducer } from './filterReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    phoneBook: phoneBookReducer,
    filter: filterReducer,
  },
});
