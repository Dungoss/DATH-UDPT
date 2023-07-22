import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserRank = ({ avatar, name, numans }) => {
  return (
    <div className="user-rank">
      <img src={avatar} alt="avatar" />
      <h2>{name}</h2>
      <b>{numans}</b>
    </div>
  );
};

UserRank.propTypes = {
  avatar: PropTypes.any,
  name: PropTypes.any,
  numans: PropTypes.any,
};

export { UserRank };
