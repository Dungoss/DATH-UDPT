import React, { useState, useEffect, useRef } from 'react';

import './styles.css';
import AuthUser from '../../components/auth/AuthUser';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  function handleOutsideClick(e) {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  const { token, user, logout } = AuthUser();
  const handleLogout = () => {
    if (token != undefined) {
      logout();
      window.location.href = '/';
    }
  };
  const handleGoToProfile = () => {
    window.location.href = '/profile';
  };
  console.log(user);
  return (
    <div ref={menuRef} className="user-menu">
      <div className="header-user-small" onClick={() => setIsOpen(!isOpen)}>
        {user.name.charAt(0).toUpperCase()}
      </div>
      {isOpen && (
        <div className="user-menu-content">
          <div className="user-info">
            <div className="header-user-big">
              <span>{user.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="user-name">
              <span>{user.name}</span>
              <span>{user.email}</span>
            </div>
          </div>
          <hr />
          <ul className="profile">
            <li onClick={handleGoToProfile}>Trang cá nhân</li>
          </ul>
          <hr />
          <ul className="post">
            <li>Câu hỏi của tôi</li>
          </ul>
          <hr />
          <ul className="configure">
            <li>Cài đặt</li>
            <li onClick={handleLogout}>Đăng xuất</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export { UserMenu };
