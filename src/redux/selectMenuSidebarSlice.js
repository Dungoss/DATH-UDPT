import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePane: 'home',
};

export const pageSlice = createSlice({
  name: 'Page',
  initialState,
  reducers: {
    setActivePane: (state, action) => {
      state.activePane = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setActivePane, resetState } = pageSlice.actions;
const { reducer } = pageSlice;
export default reducer;
