import React from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';

import './styles.css';
import { IconLogo, IconPop, IconNew, IconHot } from '../../utils/constants/img';
import { SearchBox } from '../../components';
import { useStateContext } from '../../contexts/contextProvider';

const Question = () => {
  const { detailQuestion, setDetailQuestion } = useStateContext();
  const data = useSelector((state) => state.question.questionData);
  const userData = useSelector((state) => state.question.usersData);
  const categoryData = useSelector((state) => state.question.categoryData);

  const findNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i].name;
      }
    }
    return null;
  };

  console.log(categoryData);
  console.log(detailQuestion);

  const tag = ['c++', 'cpp check'];

  let questionData = [];
  const columns = [
    {
      title: (
        <div>
          <h1>Question</h1>
          <div className="question-filter">
            <div className="question-filter-popular">
              <img src={IconPop} /> Popular
            </div>
            <div className="question-filter-hotnew">
              <img src={IconNew} /> New
            </div>
            <div className="question-filter-hotnew">
              <img src={IconHot} /> Hot
            </div>
            <SearchBox width={200} />
            <SearchBox width={200} />
          </div>
        </div>
      ),
      dataIndex: 'questions',
      key: 'questions',
    },
  ];
  const paginationConfig = {
    pageSize: 7,
  };

  const handleToQuestionDetail = () => {
    window.location.href = '/question';
  };

  return (
    <div>
      <div className="question-container">
        <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
        {data.map((_data, _idx) => {
          _data.statusApproved == 1 &&
            questionData.push({
              key: _idx + 1,
              questions: (
                <div
                  className="question"
                  onClick={() => {
                    setDetailQuestion(_data);
                    handleToQuestionDetail();
                  }}
                >
                  <div className="question-info">
                    <div className="question-info-user">
                      <img src={IconLogo} />
                      <b>{findNameById(userData, _data.userID)}</b>
                    </div>
                    <h5>0 votes</h5>
                    <h5>0 answers</h5>
                  </div>
                  <div className="question-content">
                    <div className="question-content-title">
                      <h2>{_data.questionTitle}</h2>
                    </div>
                    <div className="question-content-content">
                      <span>{_data.questionContent}</span>
                    </div>
                    <div className="question-footer">
                      <div className="question-tag">
                        {tag.map((_data, _idx) => {
                          return (
                            <div key={_idx} className="question-tag-item">
                              {_data}
                            </div>
                          );
                        })}
                      </div>
                      <div className="question-time">
                        <img src={IconLogo} />
                        <span>{findNameById(userData, _data.userID)}</span>
                        <b>1</b>
                        <span>asked 44 sec ago </span>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            });
        })}
      </div>
    </div>
  );
};

export { Question };
