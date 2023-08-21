import { createSlice } from '@reduxjs/toolkit';

import { Manage, User, Ranking, Question, IconHome, IconBusiness, Profile } from '../utils/constants/img';

const dataSidebar = [
  {
    id: 0,
    name: 'Home',
    icon: IconHome,
    key: 'home',
    role: 'general',
  },
  {
    id: 1,
    name: 'Question',
    icon: Question,
    key: 'question',
    role: 'general',
  },
  {
    id: 3,
    name: 'User',
    icon: User,
    key: 'user',
    role: 'general',
  },
  {
    id: 4,
    name: 'Monthly Ranking',
    icon: Ranking,
    key: 'ranking',
    role: 'general',
  },
  {
    id: 5,
    name: 'Category',
    icon: IconBusiness,
    key: 'category',
    role: 'admin',
  },
  {
    id: 6,
    name: 'Manage',
    icon: Manage,
    key: 'manage',
    role: 'admin',
  },
  {
    id: 7,
    name: 'Profile',
    icon: Profile,
    key: 'profile',
    role: 'user',
  },
];

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState: dataSidebar,
  reducers: {},
});

const { reducer } = sidebarReducer;
export default reducer;
