import React from 'react';
import { Input } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const { Search } = Input;

import configs from '../../config/config.cfg';
import * as questionActions from '../../redux/questionSlice';
import { useStateContext } from '../../contexts/contextProvider';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import './styles.css';
import { IconLogo } from '../../utils/constants/img';
import { UserMenu } from '../user-menu';
import AuthUser from '../../components/auth/AuthUser';

const Header = () => {
  const { token } = AuthUser();
  const dispatch = useDispatch();
  const { setIsActive, setData } = useStateContext();

  const handleToLogin = () => {
    window.location.href = '/login';
  };

  const handleToSignup = () => {
    window.location.href = '/signup';
  };

  const handleSearch = async (value) => {
    dispatch(questionActions.setLoadingChild(true));
    const response = await axios.get(`${configs.questionService}/api/questions/search-keyword?keyword=${value}`);
    setData(response.data);
    dispatch(questionActions.setLoadingChild(false));
  };

  const onSearch = async (value) => {
    handleSearch(value);
    setIsActive(1);
    dispatch(pageActions.setActivePane('question'));
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={IconLogo} />
        <h4>Mạng xã hội tri thức số Việt</h4>
      </div>
      <div className="header-input">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 400,
          }}
        />
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
