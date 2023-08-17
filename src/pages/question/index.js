import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Select, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

import configs from '../../config/config.cfg';
import './styles.css';
import { IconPop, IconHot } from '../../utils/constants/img';
import { useStateContext } from '../../contexts/contextProvider';
import AuthUser from '../../components/auth/AuthUser';
import * as questionActions from '../../redux/questionSlice';

const { Search } = Input;
const Question = () => {
  const { user } = AuthUser();
  const dispatch = useDispatch();
  let tagOptions = [];

  const { detailQuestion, setDetailQuestion, data, setData } = useStateContext();
  const userData = useSelector((state) => state.question.usersData);
  const categoryData = useSelector((state) => state.question.categoryData);
  const answerData = useSelector((state) => state.question.answerData);
  const tagData = useSelector((state) => state.question.tagData);
  const spamData = useSelector((state) => state.question.spamData);
  const voteData = useSelector((state) => state.question.voteData);
  const commentData = useSelector((state) => state.question.commentData);
  const questData = useSelector((state) => state.question.questionData);
  const trendingCat = useSelector((state) => state.question.trendingCat);

  useEffect(() => {
    setData(questData);
  }, []);

  const [openDetail, setOpenDetail] = useState(false);

  const [answer, setAnswer] = useState({
    questionID: '',
    userID: user && user.id,
    summaryContent: '1',
    fullContent: '',
    postingTime: '',
    totalVotes: '0',
  });

  const [comment, setComment] = useState({
    answerID: '',
    userID: user && user.id,
    mentionedID: '1',
    commentContent: '',
    postingTime: '',
  });

  const findNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i].name;
      }
    }
    return null;
  };

  const findAvatarById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i].avatar;
      }
    }
    return null;
  };

  const findCategoryById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].categoryID === targetId) {
        return data[i].categoryName;
      }
    }
    return null;
  };

  console.log(answer);

  const onAnswerChange = (val) => {
    setAnswer({ ...answer, ['fullContent']: val, ['questionID']: detailQuestion.id });
  };
  const onCommentChange = (val, answerID) => {
    setComment({ ...comment, ['commentContent']: val, ['answerID']: answerID });
  };
  const detailQuestionAnswer = answerData.filter((data) => data.questionID === detailQuestion?.id) || [];

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

  const onSearch = async (value) => {
    const response = await axios.get(`${configs.questionService}/api/questions/search-keyword?keyword=${value}`);
    setData(response.data);
  };

  const handleFilterByTag = async (value) => {
    const response = await axios.get(`${configs.questionService}/api/questions/search-tag?tagID="${value}"`);
    setData(response.data);
  };

  let questionData = [];
  const handleToQuestionDetail = () => {
    setOpenDetail(true);
  };
  const handleCloseQuestionDetail = () => {
    setOpenDetail(false);
  };

  const handleAnswer = async () => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    let data = _.cloneDeep(answer);
    data.postingTime = unixTimestamp;
    const response = await axios.post(`${configs.otherSerivce}/api/answers`, data);
    console.log(response);
    const response1 = await axios.put(`${configs.userSerivce}/api/users/${user.id}/increase-answer-count`);
    console.log(response1);
    const response3 = await axios.get(`${configs.otherSerivce}/api/answers`);
    dispatch(questionActions.setAnswers(response3.data));
  };

  const handleComment = async () => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    let data = _.cloneDeep(comment);
    data.postingTime = unixTimestamp;
    console.log(data);
    const response = await axios.post(`${configs.otherSerivce}/api/comments`, data);
    console.log(response);
    const response1 = await axios.get(`${configs.otherSerivce}/api/comments`);
    dispatch(questionActions.setComments(response1.data));
  };

  const onSpamChange = async () => {
    if (user && !spamData.includes(detailQuestion.id)) {
      const response = await axios.post(`${configs.questionService}/api/questions/${detailQuestion.id}/spam`);
      if (response.status == 200) {
        let temp = _.cloneDeep(spamData);
        temp.push(detailQuestion.id);
        dispatch(questionActions.setSpams(temp));
        const response1 = await axios.post(`${configs.userSerivce}/api/users/add-spam`, {
          userID: user.id,
          questionID: detailQuestion.id,
        });
        console.log(response1);
      }
    }
  };

  const onNotSpamChange = async () => {
    if (user && spamData.includes(detailQuestion.id)) {
      const response = await axios.post(`${configs.questionService}/api/questions/${detailQuestion.id}/not-spam`);
      if (response.status == 200) {
        let temp = _.cloneDeep(spamData);
        temp = temp.filter((item) => item !== detailQuestion.id);
        dispatch(questionActions.setSpams(temp));
        const response1 = await axios.post(`${configs.userSerivce}/api/users/delete-spam`, {
          userID: user.id,
          questionID: detailQuestion.id,
        });
        console.log(response1);
      }
    }
  };

  const onStarVote = async (value) => {
    const response = await axios.post(`${configs.userSerivce}/api/users/add-star`, {
      userID: user.id,
      questionID: detailQuestion.id,
      star: value,
    });
    console.log(response);
    const response10 = await axios.get(`${configs.userSerivce}/api/users/${user.id}/question-star`);
    dispatch(questionActions.setVote(response10.data));
  };

  console.log(configs.userSerivce);

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
              <img src={IconHot} /> Hot
            </div>
            {tagData.map((_data) => {
              tagOptions.push({ value: _data.tagID, label: _data.tagName });
            })}
            <Select
              style={{
                width: 120,
              }}
              placeholder="Filter By Tags"
              onChange={handleFilterByTag}
              options={tagOptions}
            />
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
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

  return (
    <div>
      {openDetail == true && (
        <div>
          <div className="question-detail">
            <div className="detail-ques">
              <div className="detail-content">
                <b onClick={handleCloseQuestionDetail}>Back</b>
                <div className="detail-content-content">
                  <div className="detail-user">
                    <img src={findAvatarById(userData, detailQuestion.userID)} alt="avatar" />
                    <div>
                      <b> {findNameById(userData, detailQuestion.userID)} </b>
                      asked a question
                    </div>
                  </div>
                  <div className="detail-title">
                    <span>{detailQuestion.questionTitle}</span>
                  </div>
                  <div className="detail-conten">
                    <div>{detailQuestion.questionContent}</div>
                  </div>
                  <div className="detail-actions">
                    <Rate defaultValue={voteData && voteData[detailQuestion.id]} onChange={onStarVote} />
                    <div className="detail-spam">
                      <Button
                        className={`btn-spam${user && spamData.includes(detailQuestion.id) ? 'spam' : ''}`}
                        onClick={onSpamChange}
                      >
                        SPAM
                      </Button>
                      <Button
                        className={`btn-spam${user && spamData.includes(detailQuestion.id) ? '' : 'notspam'}`}
                        onClick={onNotSpamChange}
                      >
                        NOT SPAM
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="detail-answer">
                {detailQuestionAnswer.map((data, idx) => (
                  <div key={idx} className="answer">
                    <div className="answer-container">
                      <div className="detail-user">
                        <img src={findAvatarById(userData, data.userID)} alt="avatar" />
                        <div>
                          <b> {findNameById(userData, data.userID)} </b>
                          answered
                        </div>
                      </div>
                      <div className="detail-title">{data.fullContent}</div>
                    </div>
                    {commentData.map(
                      (_data, commentIdx) =>
                        _data.answerID === data.answerID && (
                          <div key={commentIdx} className="comment">
                            <div className="detail-user">
                              <img src={findAvatarById(userData, _data.userID)} alt="avatar" />
                              <div>
                                <b> {findNameById(userData, _data.userID)} </b>
                                <span>{_data.commentContent}</span>
                              </div>
                            </div>
                          </div>
                        ),
                    )}
                    <div className="comment-input">
                      <Input
                        placeholder={'Enter your comment'}
                        onChange={(e) => onCommentChange(e.target.value, parseInt(data.answerID))}
                      />
                      <Button className="btn-type1" onClick={handleComment}>
                        Send Comment
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="answer-input">
                  <Input placeholder={'Enter your answer'} onChange={(e) => onAnswerChange(e.target.value)} />
                  <Button className="btn-type1" onClick={handleAnswer}>
                    Send Answer
                  </Button>
                </div>
              </div>
            </div>
            <div className="detail-trend">
              <div className="trend-title">
                <h2>TRENDING CATEGORY</h2>
              </div>
              {trendingCat &&
                trendingCat.map((_data, _idx) => {
                  return (
                    <div className="trend-item" key={_idx}>
                      {_data.categoryName}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {openDetail == false && (
        <div className="question-container">
          <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
          {data &&
            data.map((_data, _idx) => {
              _data.statusApproved == 1 &&
                questionData.push({
                  key: _idx + 1,
                  questions: (
                    <div className="question">
                      <div className="question-info">
                        <h5>{_data.totalVotes} votes</h5>
                        <h5>{_data.totalAnswer} answers</h5>
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
                          <div className="question-category">{findCategoryById(categoryData, _data.categoryID)}</div>
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
                            <img src={findAvatarById(userData, _data.userID)} />
                            <span>{findNameById(userData, _data.userID)}</span>
                            <b>{_data.totalAnswer}</b>
                            <span>
                              {_data.postingTime &&
                                (() => {
                                  const unixTimestamp = _data.postingTime;
                                  const date = new Date(unixTimestamp * 1000);
                                  const year = date.getFullYear();
                                  const month = date.getMonth() + 1;
                                  const day = date.getDate();
                                  const hours = date.getHours();
                                  const minutes = date.getMinutes();
                                  const seconds = date.getSeconds();
                                  const humanReadableTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                                  return humanReadableTime;
                                })()}
                            </span>
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
