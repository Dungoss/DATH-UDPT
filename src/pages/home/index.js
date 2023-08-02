import React, { useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import { Button, Modal, Input, Select } from 'antd';
import emailjs from '@emailjs/browser';
const { TextArea } = Input;

import AuthUser from '../../components/auth/AuthUser';
import * as questionActions from '../../redux/questionSlice';

const uploader = Uploader({
  apiKey: 'free',
});

const options = { multi: true };

import './styles.css';
import { TextShpere } from '../../components';

const Home = () => {
  const { user } = AuthUser();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [question, setQuestion] = useState({
    userID: user && user.id,
    categoryID: '',
    questionTitle: '',
    questionContent: '',
    postingTime: '',
    totalVotes: 0,
    totalAnswer: 0,
    statusApproved: 0,
    tagID: 0,
    spam: 0,
  });
  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
  const categoryData = useSelector((state) => state.question.categoryData);
  const questionData = useSelector((state) => state.question.questionData);
  const tagData = useSelector((state) => state.question.tagData);
  const emailData = useSelector((state) => state.question.adminAcceptEmail);

  let categoryOptions = [];
  let tagOptions = [];

  const sendEmail = (email) => {
    const dataToSend = {
      user_name: 'Duy Dung',
      user_email: email,
      message: 'There are new questions waiting for you to accept!',
    };

    emailjs.send('service_t0to73p', 'template_vlsexei', dataToSend, 'SUJ_rRp7ISNul0atA').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  const sendAllEmails = () => {
    emailData.forEach((data) => {
      sendEmail(data);
    });
  };

  const showModalWarning = () => {
    setIsModalWarningOpen(true);
  };
  const handleOkWarning = () => {
    setIsModalWarningOpen(false);
    window.location.href = '/login';
  };
  const handleCancelWarning = () => {
    setIsModalWarningOpen(false);
  };

  const onQuestionChange = (val) => {
    setQuestion({ ...question, ['questionContent']: val });
  };
  const onTitleChange = (val) => {
    setQuestion({ ...question, ['questionTitle']: val });
  };

  const showModal = () => {
    if (user) {
      setIsModalOpen(true);
    } else {
      showModalWarning();
    }
  };
  const handleAddQuestion = async () => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    let data = _.cloneDeep(question);
    data.postingTime = unixTimestamp;
    let tempQ = _.cloneDeep(questionData);
    tempQ.unshift(data);
    const response = await axios.post('http://localhost:8001/api/questions', data);
    console.log(response);
    if (response.status == 201) {
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}/increase-question-count`);
      console.log(response.status);
      dispatch(questionActions.setQuestion(tempQ));
    }
    sendAllEmails();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeCategory = (val) => {
    setQuestion({ ...question, ['categoryID']: val });
  };
  const handleTagChange = (val) => {
    setQuestion({ ...question, ['tagID']: JSON.stringify(val) });
  };

  return (
    <div className="home">
      <div className="word-cloud">
        <TextShpere />
      </div>
      <Button type="primary" onClick={showModal}>
        Ask Questions
      </Button>
      <Modal title="Enter your question" open={isModalOpen} onOk={handleAddQuestion} onCancel={handleCancel}>
        <Input placeholder="Title" onChange={(e) => onTitleChange(e.target.value)} />
        <TextArea rows={4} placeholder="Content" onChange={(e) => onQuestionChange(e.target.value)} />
        {categoryData.map((_data) => {
          categoryOptions.push({ value: _data.categoryID, label: _data.categoryName });
        })}
        {tagData.map((_data) => {
          tagOptions.push({ value: _data.tagID, label: _data.tagName });
        })}
        <Select
          style={{
            width: 120,
          }}
          placeholder="Category"
          onChange={handleChangeCategory}
          options={categoryOptions}
        />
        <Select
          mode="multiple"
          allowClear
          style={{
            width: '100%',
          }}
          placeholder="Please select"
          onChange={handleTagChange}
          options={tagOptions}
        />
        <UploadButton
          uploader={uploader}
          options={options}
          onComplete={(files) => files.map((x) => setUploadedImg([...uploadedImg, x.fileUrl]))}
        >
          {({ onClick }) => <button onClick={onClick}>Upload a file...</button>}
        </UploadButton>
      </Modal>
      <span>Popular Topic</span>
      <div className="popular-topic">
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
      </div>
      <span>Topic</span>
      <div className="popular-topic">
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
        <div className="topic"></div>
      </div>
      <Modal title="Basic Modal" open={isModalWarningOpen} onOk={handleOkWarning} onCancel={handleCancelWarning}>
        <p>Login first you bitch...</p>
      </Modal>
    </div>
  );
};

export { Home };
