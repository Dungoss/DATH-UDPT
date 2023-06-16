import React from 'react';

import './styles.css';
import { IconLogo, IconNoti } from '../../utils/constants/img';
import { SearchBox } from '../search-box';

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <img src={IconLogo} />
        <h4>Học Lập Trình Để Đi Làm</h4>
      </div>
      <div className="header-input">
        <SearchBox />
      </div>
      <div className="header-avatar">
        <img src={IconNoti} />
        <div className="header-user">
          <span>L</span>
        </div>
      </div>
    </div>
  );
};

export { Header };
