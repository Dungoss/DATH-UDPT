import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questionData: [],
  categoryData: [],
  usersData: [],
  answerData: [],
  commentData: [],
  tagData: [],
  tagCloudData: [],
  spamData: [],
  voteData: [],
  questionUserData: [],
  userDetail: [],
  monthlyQuestionRanking: [],
  monthlyAnswerRanking: [],
  adminAcceptEmail: [],
  trendingCat: [],
  loading: false,
  loadingChild: false,
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
    setComments: (state, action) => {
      state.commentData = action.payload;
    },
    setTags: (state, action) => {
      state.tagData = action.payload;
    },
    setTagCloud: (state, action) => {
      state.tagCloudData = action.payload;
    },
    setSpams: (state, action) => {
      state.spamData = action.payload;
    },
    setVote: (state, action) => {
      state.voteData = action.payload;
    },
    setQuestionUser: (state, action) => {
      state.questionUserData = action.payload;
    },
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setQuestionRank: (state, action) => {
      state.monthlyQuestionRanking = action.payload;
    },
    setAnswerRank: (state, action) => {
      state.monthlyAnswerRanking = action.payload;
    },
    setAdminAccept: (state, action) => {
      state.adminAcceptEmail = action.payload;
    },
    setTrendingCate: (state, action) => {
      state.trendingCat = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingChild: (state, action) => {
      state.loadingChild = action.payload;
    },
    resetState: () => initialState,
  },
});

export const {
  setTrendingCate,
  setQuestion,
  setCategory,
  setUserDetail,
  setUsers,
  setQuestionUser,
  setAnswers,
  setComments,
  setTags,
  setTagCloud,
  setSpams,
  setVote,
  resetState,
  setAnswerRank,
  setQuestionRank,
  setAdminAccept,
  setLoading,
  setLoadingChild,
} = questionSlice.actions;
const { reducer } = questionSlice;
export default reducer;
