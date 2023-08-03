import React from 'react';

import './styles.css';
import { IconLogo } from '../../utils/constants/img';
import { SearchBox } from '../search-box';
import { UserMenu } from '../user-menu';
import AuthUser from '../../components/auth/AuthUser';

const Header = () => {
  const { token } = AuthUser();

  const handleToLogin = () => {
    window.location.href = '/login';
  };

  const handleToSignup = () => {
    window.location.href = '/signup';
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={IconLogo} />
        <h4>Học Lập Trình Để Đi Làm</h4>
      </div>
      <div className="header-input">
        <SearchBox width={400} />
      </div>
      {!token && (
        <div className="header-avatar">
          <div className="signin-up" onClick={handleToLogin}>
            <span>Đăng nhập</span>
          </div>
          <div className="signin-up" onClick={handleToSignup}>
            <span> Đăng ký</span>
          </div>
        </div>
      )}
      {token && (
        <div className="header-avatar">
          <UserMenu />
        </div>
      )}
    </div>
  );
};

export { Header };
