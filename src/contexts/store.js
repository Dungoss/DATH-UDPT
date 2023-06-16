import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from '../redux/sidebarSlice';
import pageSlice from '../redux/selectMenuSidebarSlice';

const rootReducer = {
  sidebar: sidebarReducer,
  page: pageSlice,
};

export const store = configureStore({
  reducer: rootReducer,
});
