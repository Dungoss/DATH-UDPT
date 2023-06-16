import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from '../redux/sidebarSlice';

const rootReducer = {
  sidebar: sidebarReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});
