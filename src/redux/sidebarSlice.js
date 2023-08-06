import { createSlice } from '@reduxjs/toolkit';

import { IconHome, IconPopular, IconSport, IconBusiness, IconCrypto } from '../utils/constants/img';

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
    icon: IconPopular,
    key: 'question',
    role: 'general',
  },
  {
    id: 3,
    name: 'User',
    icon: IconSport,
    key: 'user',
    role: 'general',
  },
  {
    id: 4,
    name: 'Monthly Ranking',
    icon: IconSport,
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
    icon: IconCrypto,
    key: 'manage',
    role: 'admin',
  },
  {
    id: 7,
    name: 'Profile',
    icon: IconCrypto,
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
