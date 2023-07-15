import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import { Header, SidebarItem } from '../../components';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import { getQuestionData } from '../../utils/api/question-api';
import { IconBusiness } from '../../utils/constants/img';
import AuthUser from '../auth/AuthUser';

function Layout({ propchild }) {
  const { user } = AuthUser();
  const dispatch = useDispatch();

  useEffect(() => {
    getQuestionData(dispatch);
  });

  const [isActive, setIsActive] = useState(0);

  const handleActiveSidebar = (idx, pane, _idx) => {
    setIsActive(idx);
    console.log(_idx);
    dispatch(pageActions.setActivePane(pane));
  };

  const moveToCategory = () => {
    window.location.href = '/category';
  };

  const moveToQuestionManagement = () => {
    window.location.href = '/manage';
  };

  const dataSidebar = useSelector((state) => state.sidebar);
  return (
    <div className="layout">
      <Header />
      <div className="below-header">
        <div className="sidebar-menu">
          <span>Feed</span>
          {dataSidebar.map((_data, _idx) => {
            return (
              <SidebarItem
                data={_data}
                key={_idx}
                onClick={() => handleActiveSidebar(_data.id, _data.key)}
                isActive={isActive}
              />
            );
          })}
          {user && user.role == 'admin' && (
            <div className={`item__sidebar__menu`} onClick={moveToCategory}>
              <img src={IconBusiness} alt={IconBusiness} />
            </div>
          )}
          {user && user.role == 'admin' && (
            <div className={`item__sidebar__menu`} onClick={moveToQuestionManagement}>
              <img src={IconBusiness} alt={IconBusiness} />
            </div>
          )}
        </div>
        <div className="content-container">
          <div>{propchild}</div>
        </div>
      </div>
    </div>
  );
}

Layout.propTypes = {
  propchild: PropTypes.object,
};

export { Layout };
