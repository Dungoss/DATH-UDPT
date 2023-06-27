import React from 'react';

import './styles.css';

// import { WallPaper } from '../../utils/constants/img';

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="wall-paper">{/* <img src={WallPaper} /> */}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div className="avatar"></div>
        <span>Nguyễn Lê Nguyên</span>
      </div>

      <div>
        <div className="profile-nav"></div>
        <div className="profile-content"></div>
      </div>
    </div>
  );
};

export { Profile };
