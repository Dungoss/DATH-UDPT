import axios from 'axios';
import { useState } from 'react';

import configs from '../../config/config.cfg';
export default function AuthUser() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken;
  };

  const getUser = () => {
    const userString = sessionStorage.getItem('user');
    const user_detail = JSON.parse(userString);
    return user_detail;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (user, token) => {
    sessionStorage.setItem('token', JSON.stringify(token));
    sessionStorage.setItem('user', JSON.stringify(user));

    setToken(token);
    setUser(user);
    window.location.href = '/';
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const http = axios.create({
    baseURL: `${configs.userSerivce}/api`,
    headers: {
      // 'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return {
    setToken: saveToken,
    token,
    user,
    getToken,
    http,
    logout,
  };
}
