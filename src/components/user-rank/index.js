import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserRank = (props) => {
  const { avatar, name, numquest, numans, action, ...userProps } = props;
  return (
    <div className="user-rank" {...userProps}>
      <img src={avatar} alt="avatar" onClick={action} />
      <h2>{name}</h2>
      <b>{numquest} questions</b>
      <b>{numans} answers</b>
    </div>
  );
};

UserRank.propTypes = {
  avatar: PropTypes.any,
  name: PropTypes.any,
  numans: PropTypes.any,
  numquest: PropTypes.any,
  action: PropTypes.any,
};

export { UserRank };
