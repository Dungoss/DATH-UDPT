import React from 'react';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

import './styles.css';

const SidebarItem = ({ data, isSidebarSmall, onClick, isActive }) => {
  return (
    <div
      className={`item__sidebar__menu ${isActive === data.id ? 'item__sidebar__menu-active' : ''}`}
      onClick={onClick}
    >
      <img style={{ width: '30px', height: '30px' }} src={data.icon} alt={data.name} />
      <p className={`${isSidebarSmall ? 'display-none' : ''}`}>{data.name}</p>
    </div>
  );
};
SidebarItem.propTypes = {
  data: PropTypes.object,
  isSidebarSmall: PropTypes.bool,
  onClick: PropTypes.func,
  isActive: PropTypes.number,
};

export { SidebarItem };
