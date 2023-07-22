import React from 'react';
import { useSelector } from 'react-redux';

import './styles.css';
import { UserRank } from '../../components';

const User = () => {
  const userData = useSelector((state) => state.question.usersData);
  console.log(userData);
  return (
    <div className="user">
      {userData.map((data, idx) => {
        return <UserRank key={idx} name={data.name} numans={100} avatar={data.avatar} />;
      })}
    </div>
  );
};

export { User };
