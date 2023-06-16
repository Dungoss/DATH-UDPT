import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activePane: 'dashboard',
};

export const pageSlice = createSlice({
  name: 'popPage',
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
