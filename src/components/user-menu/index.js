import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';
import AuthUser from '../../components/auth/AuthUser';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import { useStateContext } from '../../contexts/contextProvider';

const UserMenu = () => {
  const dispatch = useDispatch();
  const { setIsActive } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const userData = useSelector((state) => state.question.userDetail);

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
    setIsActive(7);
    dispatch(pageActions.setActivePane('profile'));
  };

  return (
    <div ref={menuRef} className="user-menu">
      <div className="header-user-small" onClick={() => setIsOpen(!isOpen)}>
        <img
          style={{ width: '40px', height: '40px', borderRadius: '100%', marginLeft: '12px' }}
          src={userData.avatar}
        />
      </div>
      {isOpen && (
        <div className="user-menu-content">
          <div className="user-info">
            {userData && userData.avatar ? (
              <img
                style={{ width: '40px', height: '40px', borderRadius: '100%', marginLeft: '12px' }}
                src={userData.avatar}
              />
            ) : (
              <div className="header-user-big">
                <span>{user.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div className="user-name">
              <span>{user.name}</span>
            </div>
          </div>
          <hr />
          <ul className="profile">
            <li onClick={handleGoToProfile}>Trang cá nhân</li>
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
