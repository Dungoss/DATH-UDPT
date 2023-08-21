import React, { useEffect, useState } from 'react';
import { Input, Button, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

import configs from '../../config/config.cfg';
import './styles.css';
import { useStateContext } from '../../contexts/contextProvider';
import AuthUser from '../../components/auth/AuthUser';
import * as questionActions from '../../redux/questionSlice';

const QuestionDetail = () => {
  const { user } = AuthUser();
  const dispatch = useDispatch();

  const { detailQuestion, setIsModalWarningOpen, setOpenDetail, setData } = useStateContext();
  const userData = useSelector((state) => state.question.usersData);
  const answerData = useSelector((state) => state.question.answerData);
  const spamData = useSelector((state) => state.question.spamData);
  const voteData = useSelector((state) => state.question.voteData);
  const commentData = useSelector((state) => state.question.commentData);
  const questData = useSelector((state) => state.question.questionData);
  const trendingCat = useSelector((state) => state.question.trendingCat);

  useEffect(() => {
    setData(questData);
  }, []);

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

  console.log(answer);

  const showModalWarning = () => {
    setIsModalWarningOpen(true);
  };

  const onAnswerChange = (val) => {
    setAnswer({ ...answer, ['fullContent']: val, ['questionID']: detailQuestion.id });
  };
  const onCommentChange = (val, answerID) => {
    setComment({ ...comment, ['commentContent']: val, ['answerID']: answerID });
  };
  const detailQuestionAnswer = answerData.filter((data) => data.questionID === detailQuestion?.id) || [];

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
    } else {
      showModalWarning();
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
    } else {
      showModalWarning();
    }
  };

  const onStarVote = async (value) => {
    if (user) {
      const response = await axios.post(`${configs.userSerivce}/api/users/add-star`, {
        userID: user.id,
        questionID: detailQuestion.id,
        star: value,
      });
      console.log(response);
      const response10 = await axios.get(`${configs.userSerivce}/api/users/${user.id}/question-star`);
      dispatch(questionActions.setVote(response10.data));
    } else {
      showModalWarning();
    }
  };

  console.log(configs.userSerivce);

  return (
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
                <div className="RateStar">
                  <Rate defaultValue={voteData && voteData[detailQuestion.id]} onChange={onStarVote} />
                </div>

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
  );
};

export { QuestionDetail };
