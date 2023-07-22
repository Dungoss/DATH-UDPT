import { createSlice } from '@reduxjs/toolkit';

import { IconHome, IconPopular, IconGame, IconSport, IconBusiness, IconCrypto } from '../utils/constants/img';

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
    id: 2,
    name: 'Topic',
    icon: IconGame,
    key: 'topic',
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
    name: 'Category',
    icon: IconBusiness,
    key: 'category',
    role: 'admin',
  },
  {
    id: 5,
    name: 'Manage',
    icon: IconCrypto,
    key: 'manage',
    role: 'admin',
  },
  {
    id: 6,
    name: 'Profile',
    icon: IconCrypto,
    key: 'profile',
    role: 'general',
  },
];

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState: dataSidebar,
  reducers: {},
});

const { reducer } = sidebarReducer;
export default reducer;
