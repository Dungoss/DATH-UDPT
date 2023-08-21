import React, { useState } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import './styles.css';
import { UserRank } from '../../components';
import { ProfileOther } from '../profile-others';

const Ranking = () => {
  const answerRanking = useSelector((state) => state.question.monthlyAnswerRanking);
  const questionRanking = useSelector((state) => state.question.monthlyQuestionRanking);

  const [showProfile, setShowProfile] = useState(false);
  const [showProfileAnswerTop, setShowProfileAnswerTop] = useState(false);

  const setShow = (data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    setShowProfile(true);
  };

  const setShowAnswerTop = (data) => {
    localStorage.setItem('profile', JSON.stringify(data));
    setShowProfileAnswerTop(true);
  };

  return (
    <div className="ranking">
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Questions Ranking',
            key: '1',
            children: (
              <div className="question-rank">
                {!showProfile ? (
                  questionRanking &&
                  questionRanking.map((data, idx) => {
                    return (
                      <UserRank
                        key={idx}
                        avatar={data.user_data.avatar}
                        name={data.user_data.name}
                        numquest={data.num_quest}
                        action={() => setShow(data.user_data)}
                        rank={idx + 1}
                      />
                    );
                  })
                ) : (
                  <div className="user">
                    <ProfileOther />
                  </div>
                )}
              </div>
            ),
          },
          {
            label: 'Answers Ranking',
            key: '2',
            children: (
              <div className="answer-rank">
                {!showProfileAnswerTop ? (
                  answerRanking &&
                  answerRanking.map((data, idx) => {
                    return (
                      <UserRank
                        key={idx}
                        avatar={data.user_data.avatar}
                        name={data.user_data.name}
                        numans={data.num_ans}
                        action={() => setShowAnswerTop(data.user_data)}
                        rank={idx + 1}
                      />
                    );
                  })
                ) : (
                  <div className="user">
                    <ProfileOther />
                  </div>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export { Ranking };
