import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles.css';
import { Header } from '../../components';
import { SidebarItem } from '../../components';
import * as pageActions from '../../redux/selectMenuSidebarSlice';

function Layout() {
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
      <div className="layout__sidebar__menu">
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
    </div>
  );
}

export { Layout };
