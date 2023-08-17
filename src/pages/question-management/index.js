import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import _ from 'lodash';

import configs from '../../config/config.cfg';
import './styles.css';
import * as questionActions from '../../redux/questionSlice';

const QuestionManagement = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.question.questionData);
  const [questionsToDelete, setQuestionsToDelete] = useState([]);
  const userData = useSelector((state) => state.question.usersData);
  const tagData = useSelector((state) => state.question.tagData);
  const userDetail = useSelector((state) => state.question.userDetail);

  let temp = _.cloneDeep(data);
  let updatedData = [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setQuestionsToDelete((prevQuestionsToDelete) => [...prevQuestionsToDelete, id]);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await axios.delete(`${configs.questionService}/api/questions/${questionsToDelete[0]}`);
    updatedData = temp.filter((item) => item.id !== questionsToDelete[0]);
    if (response.status == 200) {
      setQuestionsToDelete([]);
      dispatch(questionActions.setQuestion(updatedData));
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isModalApproveOpen, setIsModalApproveOpen] = useState(false);
  const showModalApprove = (id) => {
    setQuestionsToDelete((prevQuestionsToDelete) => [...prevQuestionsToDelete, id]);
    setIsModalApproveOpen(true);
  };
  const handleOkApprove = async () => {
    const response = await axios.put(`${configs.questionService}/api/questions/${questionsToDelete[0]}/status`, {
      statusApproved: 1,
    });
    updatedData = temp.map((item) => {
      if (item.id === questionsToDelete[0]) {
        return { ...item, statusApproved: 1 };
      }
      return item;
    });
    if (response.status == 200) {
      setQuestionsToDelete([]);
      dispatch(questionActions.setQuestion(updatedData));
    }

    setIsModalApproveOpen(false);
  };
  const handleCancelApprove = () => {
    setIsModalApproveOpen(false);
  };

  const [isModalAutoApproveOpen, setIsModalAutoApproveOpen] = useState(false);
  const showModalAutoApprove = () => {
    setIsModalAutoApproveOpen(true);
  };
  const handleOkAutoApprove = async () => {
    const response = await axios.put(`${configs.questionService}/api/questions/auto-approve`);
    if (response.status == 200) {
      const response = await axios.get(`${configs.questionService}/api/questions`);
      dispatch(questionActions.setQuestion(response.data));
    }
    setIsModalAutoApproveOpen(false);
  };
  const handleCancelAutoApprove = () => {
    setIsModalAutoApproveOpen(false);
  };

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

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

  const emailNotiSubscribe = async () => {
    const response = await axios.put(`${configs.userSerivce}/api/users/${userDetail.id}/accept-noti`, {
      accept_noti: 1,
    });
    console.log(response);
    const response1 = await axios.get(`${configs.userSerivce}/api/users/${userDetail.id}`);
    dispatch(questionActions.setUserDetail(response1.data));
  };

  const emailNotiUnsubscribe = async () => {
    const response = await axios.put(`${configs.userSerivce}/api/users/${userDetail.id}/accept-noti`, {
      accept_noti: 0,
    });
    console.log(response);
    const response1 = await axios.get(`${configs.userSerivce}/api/users/${userDetail.id}`);
    dispatch(questionActions.setUserDetail(response1.data));
  };

  let questionData = [];
  const columns = [
    {
      title: (
        <div>
          <h1>Questions Management</h1>
          <div className="question-manage-options">
            <Button
              className={`btn-subscribe${userDetail && userDetail.accept_noti == 1 ? '-true' : ''}`}
              onClick={emailNotiSubscribe}
            >
              Subscribe for Email Noti
            </Button>
            <Button
              className={`btn-unsubscribe${userDetail && userDetail.accept_noti == 0 ? '-true' : ''}`}
              onClick={emailNotiUnsubscribe}
            >
              Unsubscribe for Email Noti
            </Button>
            <Button onClick={showModalAutoApprove}>Auto Approve</Button>
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
      <div className="question-container">
        <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
        {data.map((_data, _idx) => {
          _data.statusApproved == 0 &&
            questionData.push({
              key: _idx + 1,
              questions: (
                <div className="question">
                  <div className="question-info">
                    <h5>{_data.totalVotes} votes</h5>
                    <h5>{_data.totalAnswer} answers</h5>
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
                  <div className="manage-q-action">
                    <CheckCircleFilled
                      style={{ fontSize: '24px' }}
                      onClick={() => {
                        showModalApprove(_data.id);
                      }}
                    />
                    <CloseCircleFilled style={{ fontSize: '24px' }} onClick={() => showModal(_data.id)} />
                  </div>
                </div>
              ),
            });
        })}
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure to delete this question?</p>
      </Modal>
      <Modal title="Basic Modal" open={isModalApproveOpen} onOk={handleOkApprove} onCancel={handleCancelApprove}>
        <p>Are you sure to approve this question?</p>
      </Modal>
      <Modal
        title="Basic Modal"
        open={isModalAutoApproveOpen}
        onOk={handleOkAutoApprove}
        onCancel={handleCancelAutoApprove}
      >
        <p>Are you sure to enable auto approve?</p>
      </Modal>
    </div>
  );
};

export { QuestionManagement };
