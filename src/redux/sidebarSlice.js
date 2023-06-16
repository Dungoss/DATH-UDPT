import { createSlice } from '@reduxjs/toolkit';

import {
  IconHome,
  IconPopular,
  IconGame,
  IconSport,
  IconBusiness,
  IconCrypto,
  IconTV,
  IconCeleb,
} from '../utils/constants/img';

const dataSidebar = [
  {
    id: 0,
    name: 'Home',
    icon: IconHome,
    key: 'home',
  },
  {
    id: 1,
    name: 'Popular',
    icon: IconPopular,
    key: 'popular',
  },
  {
    id: 2,
    name: 'Gaming',
    icon: IconGame,
    key: 'gaming',
  },
  {
    id: 3,
    name: 'Sports',
    icon: IconSport,
    key: 'sports',
  },
  {
    id: 4,
    name: 'Business',
    icon: IconBusiness,
    key: 'business',
  },
  {
    id: 5,
    name: 'Crypto',
    icon: IconCrypto,
    key: 'crypto',
  },
  {
    id: 6,
    name: 'Television',
    icon: IconTV,
    key: 'television',
  },
  {
    id: 7,
    name: 'Celebrity',
    icon: IconCeleb,
    key: 'celebrity',
  },
];

const sidebarReducer = createSlice({
  name: 'sidebar',
  initialState: dataSidebar,
  reducers: {},
});

const { reducer } = sidebarReducer;
export default reducer;
