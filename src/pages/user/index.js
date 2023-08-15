import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './styles.css';
import { UserRank } from '../../components';
import { ProfileOther } from '../profile-others';

const User = () => {
  const userData = useSelector((state) => state.question.usersData);

  const [showProfile, setShowProfile] = useState(false);

  const setShow = (data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    setShowProfile(true);
  };

  return (
    <>
      {!showProfile ? (
        <div className="user">
          {userData.map((data, idx) => {
            return (
              <UserRank
                key={idx}
                name={data.name}
                numquest={data.question_count}
                numans={data.answer_count}
                avatar={data.avatar}
                action={() => setShow(data)}
                rank={idx + 1}
              />
            );
          })}
        </div>
      ) : (
        <div className="user">
          <ProfileOther />
        </div>
      )}
    </>
  );
};

export { User };
