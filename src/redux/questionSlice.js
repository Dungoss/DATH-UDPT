import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: [],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.questionData = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setQuestion, resetState } = questionSlice.actions;
const { reducer } = questionSlice;
export default reducer;
