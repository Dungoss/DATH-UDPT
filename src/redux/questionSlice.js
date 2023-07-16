import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: [],
  categoryData: [],
  usersData: [],
};

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    setQuestion: (state, action) => {
      state.questionData = action.payload;
    },
    setCategory: (state, action) => {
      state.categoryData = action.payload;
    },
    setUsers: (state, action) => {
      state.usersData = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setQuestion, setCategory, setUsers, resetState } = questionSlice.actions;
const { reducer } = questionSlice;
export default reducer;
