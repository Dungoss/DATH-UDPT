import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import { Header, SidebarItem } from '../../components';
import * as pageActions from '../../redux/selectMenuSidebarSlice';

function Layout({ propchild }) {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(0);

  const handleActiveSidebar = (idx, pane, _idx) => {
    setIsActive(idx);
    console.log(_idx);
    dispatch(pageActions.setActivePane(pane));
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
