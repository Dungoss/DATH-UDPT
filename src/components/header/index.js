import React from 'react';

import './styles.css';
import { IconLogo } from '../../utils/constants/img';
import { SearchBox } from '../search-box';
import AuthUser from '../../components/auth/AuthUser';

const Header = () => {
  const { token, logout } = AuthUser();

  const handleToLogin = () => {
    window.location.href = '/login';
  };

  const handleToSignup = () => {
    window.location.href = '/signup';
  };

  const handleLogout = () => {
    if (token != undefined) {
      logout();
    }
  };

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
        {/* <img src={IconNoti} />
        <div className="header-user">
          <span>L</span>
        </div> */}
        <div className="signin-up" onClick={handleToLogin}>
          <span>Đăng nhập</span>
        </div>
        <div className="signin-up" onClick={handleToSignup}>
          <span> Đăng ký</span>
        </div>
        <div className="signin-up" onClick={handleLogout}>
          <span> Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

export { Header };
