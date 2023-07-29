import React from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';

import { UserRank } from '../../components';

const Ranking = () => {
  const answerRanking = useSelector((state) => state.question.monthlyAnswerRanking);
  const questionRanking = useSelector((state) => state.question.monthlyQuestionRanking);
  console.log(questionRanking, answerRanking);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: 'Questions Ranking',
            key: '1',
            children: (
              <div>
                {questionRanking &&
                  questionRanking.map((data, idx) => {
                    return (
                      <UserRank
                        key={idx}
                        avatar={data.user_data.avatar}
                        name={data.user_data.name}
                        numquest={data.num_quest}
                      />
                    );
                  })}
              </div>
            ),
          },
          {
            label: 'Answers Ranking',
            key: '2',
            children: (
              <div>
                {answerRanking &&
                  answerRanking.map((data, idx) => {
                    return (
                      <UserRank
                        key={idx}
                        avatar={data.user_data.avatar}
                        name={data.user_data.name}
                        numans={data.num_ans}
                      />
                    );
                  })}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export { Ranking };
