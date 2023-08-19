import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const UserRank = (props) => {
  const { rank, avatar, name, numquest, numans, action, ...userProps } = props;
  return (
    <div className="user-rank" {...userProps}>
      <h2>{rank}</h2>
      <img src={avatar} alt="avatar" onClick={action} />
      <div className="user-rank-info">
        <div className="qna-info">
          <h3>{name}</h3>
          <b>{numquest && `${numquest} questions`} </b>
          <b>{numans && `${numans} answers`} </b>
        </div>
        <div className="level">
          <b>
            {numans &&
              numquest &&
              (() => {
                let level;

                if (numquest > 40 && numans > 20) {
                  level = 'Level 5';
                } else if (numquest > 30 && numans > 15) {
                  level = 'Level 4';
                } else if (numquest > 20 && numans > 10) {
                  level = 'Level 3';
                } else if (numquest > 10 && numans > 5) {
                  level = 'Level 2';
                } else {
                  level = 'Level 1';
                }

                return level;
              })()}
          </b>
        </div>
      </div>
    </div>
  );
};

UserRank.propTypes = {
  avatar: PropTypes.any,
  name: PropTypes.any,
  numans: PropTypes.any,
  numquest: PropTypes.any,
  action: PropTypes.any,
  rank: PropTypes.any,
};

export { UserRank };
