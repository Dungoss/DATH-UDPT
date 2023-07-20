import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: [],
  categoryData: [],
  usersData: [],
  answerData: [],
  tagData: [],
  spamData: [],
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
    setAnswers: (state, action) => {
      state.answerData = action.payload;
    },
    setTags: (state, action) => {
      state.tagData = action.payload;
    },
    setSpams: (state, action) => {
      state.spamData = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setQuestion, setCategory, setUsers, setAnswers, setTags, setSpams, resetState } = questionSlice.actions;
const { reducer } = questionSlice;
export default reducer;
