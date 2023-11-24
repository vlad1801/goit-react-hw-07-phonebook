import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  filter: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: INITIAL_STATE,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload ;
    },
  },
});


export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer