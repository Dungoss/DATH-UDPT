import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from '../redux/sidebarSlice';
import pageSlice from '../redux/selectMenuSidebarSlice';
import questionSlice from '../redux/questionSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  page: pageSlice,
  question: questionSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});
