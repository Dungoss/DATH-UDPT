import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

import './styles.css';
import { IconLogo, IconPop, IconNew, IconHot } from '../../utils/constants/img';
import { SearchBox } from '../../components';

const QuestionManagement = () => {
  const data = useSelector((state) => state.question.questionData);
  const [questionsToDelete, setQuestionsToDelete] = useState([]);
  const userData = useSelector((state) => state.question.usersData);
  const categoryData = useSelector((state) => state.question.categoryData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setQuestionsToDelete((prevQuestionsToDelete) => [...prevQuestionsToDelete, id]);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await axios.delete(`http://localhost:8000/api/questions/${questionsToDelete[0]}`);
    console.log(response);
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
    const response = await axios.put(`http://localhost:8000/api/questions/${questionsToDelete[0]}/status`, {
      statusApproved: 1,
    });
    console.log(response);
    setIsModalApproveOpen(false);
  };
  const handleCancelApprove = () => {
    setIsModalApproveOpen(false);
  };

  const findNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === targetId) {
        return data[i].name;
      }
    }
    return null;
  };

  console.log(data);
  console.log(userData);
  console.log(categoryData);

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
                  <CheckCircleFilled style={{ fontSize: '24px' }} onClick={() => showModalApprove(_data.id)} />
                  <CloseCircleFilled style={{ fontSize: '24px' }} onClick={() => showModal(_data.id)} />
                </div>
              ),
            });
        })}
      </div>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure to delete this question?</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Modal title="Basic Modal" open={isModalApproveOpen} onOk={handleOkApprove} onCancel={handleCancelApprove}>
        <p>Are you sure to approve this question?</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export { QuestionManagement };
