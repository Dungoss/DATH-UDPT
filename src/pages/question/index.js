import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

import './styles.css';
import { IconLogo, IconPop, IconNew, IconHot } from '../../utils/constants/img';
import { SearchBox } from '../../components';
import { useStateContext } from '../../contexts/contextProvider';
import AuthUser from '../../components/auth/AuthUser';

const Question = () => {
  const { user } = AuthUser();
  const { detailQuestion, setDetailQuestion } = useStateContext();
  const data = useSelector((state) => state.question.questionData);
  const userData = useSelector((state) => state.question.usersData);
  const categoryData = useSelector((state) => state.question.categoryData);
  const answerData = useSelector((state) => state.question.answerData);
  const tagData = useSelector((state) => state.question.tagData);
  const spamData = useSelector((state) => state.question.spamData);

  const [openDetail, setOpenDetail] = useState(false);
  const [spam, setSpam] = useState(0);
  const [notSpam, setNotSpam] = useState(0);

  const [answer, setAnswer] = useState({
    questionID: '',
    userID: user && user.id,
    summaryContent: '1',
    fullContent: '1',
    postingTime: '1',
    totalVotes: '1',
  });

  console.log(answer);

  const findNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i].name;
      }
    }
    return null;
  };

  const onAnswerChange = (val) => {
    setAnswer({ ...answer, ['fullContent']: val, ['questionID']: detailQuestion.id });
  };

  console.log(categoryData);

  const detailQuestionAnswer = answerData.filter((data) => data.questionID === detailQuestion?.id) || [];
  console.log(detailQuestionAnswer);

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

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
    setOpenDetail(true);
  };

  const handleAnswer = async () => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    let data = _.cloneDeep(answer);
    data.postingTime = unixTimestamp;
    const response = await axios.post('http://localhost:8000/api/answers', data);
    console.log(response);
  };

  const onSpamChange = () => {
    setNotSpam(0);
    setSpam(1);
  };

  const onNotSpamChange = () => {
    setSpam(0);
    setNotSpam(1);
  };

  console.log(spam, notSpam, spamData, detailQuestion);

  return (
    <div>
      {openDetail == true && (
        <div>
          <div className="question-detail">
            <div className="detail-ques">
              <div className="detail-content">
                <div>{findNameById(userData, detailQuestion.userID)} asked a question</div>
                <span>{detailQuestion.questionTitle}</span>
                <div>{detailQuestion.questionContent}</div>
                <Button className={spamData.includes(detailQuestion.id) ? 'spam' : 'notspam'} onClick={onSpamChange}>
                  SPAM
                </Button>
                <Button onClick={onNotSpamChange}>NOT SPAM</Button>
              </div>
              <div className="detail-answer">
                {detailQuestionAnswer.map((data, idx) => {
                  return (
                    <div key={idx} className="answer">
                      <span>{findNameById(userData, data.userID)}</span>
                      {data.fullContent}
                    </div>
                  );
                })}
                <Input onChange={(e) => onAnswerChange(e.target.value)} />
                <Button onClick={handleAnswer}>Send Answer</Button>
              </div>
            </div>
            <div className="detail-trend"></div>
          </div>
        </div>
      )}
      {openDetail == false && (
        <div className="question-container">
          <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
          {data.map((_data, _idx) => {
            _data.statusApproved == 1 &&
              questionData.push({
                key: _idx + 1,
                questions: (
                  <div className="question">
                    <div className="question-info">
                      <div className="question-info-user">
                        <img src={IconLogo} />
                        <b>{findNameById(userData, _data.userID)}</b>
                      </div>
                      <h5>0 votes</h5>
                      <h5>0 answers</h5>
                    </div>
                    <div className="question-content">
                      <div
                        className="question-content-title"
                        onClick={() => {
                          setDetailQuestion(_data);
                          handleToQuestionDetail();
                        }}
                      >
                        <h2>{_data.questionTitle}</h2>
                      </div>
                      <div className="question-content-content">
                        <span>{_data.questionContent}</span>
                      </div>
                      <div className="question-footer">
                        <div className="question-tag">
                          {JSON.parse(_data.tagID).map((_data, _idx) => {
                            return (
                              <div key={_idx} className="question-tag-item">
                                {findTagNameById(tagData, _data)}
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
      )}
    </div>
  );
};

export { Question };
