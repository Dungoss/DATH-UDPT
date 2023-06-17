import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import './styles.css';
import { Header, Slider, SidebarItem } from '../../components';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import { Slider1, Slider2 } from '../../utils/constants/img';

function Layout({ propchild }) {
  const dispatch = useDispatch();
  const sliderItems = [
    {
      url: Slider1,
      title: 'slider1',
    },
    {
      url: Slider2,
      title: 'slider1',
    },
  ];

  const [isActive, setIsActive] = useState(0);

  const handleActiveSidebar = (idx, pane, _idx) => {
    setIsActive(idx);
    console.log(_idx);
    dispatch(pageActions.setActivePane(pane));
  };

  const containerStyles = {
    width: '500px',
    height: '280px',
    margin: '0 auto',
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
          <div style={containerStyles}>
            <Slider slides={sliderItems} parentWidth={500} />
          </div>
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
