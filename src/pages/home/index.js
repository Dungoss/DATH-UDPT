import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
const { TextArea } = Input;
import _ from 'lodash';

import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';

import axios from 'axios';

import AuthUser from '../../components/auth/AuthUser';

const uploader = Uploader({
  apiKey: 'free',
});

const options = { multi: true };

import './styles.css';
import { TextShpere } from '../../components';

const Home = () => {
  const { user } = AuthUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);

  const [question, setQuestion] = useState({
    userID: user && user.id,
    categoryID: '1',
    questionTitle: '1',
    questionContent: '1',
    postingTime: '1',
    totalVotes: '1',
    totalAnswer: '1',
    statusApproved: 0,
  });

  const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
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
  const handleOk = async () => {
    const currentTime = new Date();
    const unixTimestamp = Math.floor(currentTime.getTime() / 1000);
    let data = _.cloneDeep(question);
    data.postingTime = unixTimestamp;
    const response = await axios.post('http://localhost:8000/api/questions', data);
    console.log(response);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      <div className="word-cloud">
        <TextShpere />
      </div>
      <Button type="primary" onClick={showModal}>
        Ask Questions
      </Button>
      <Modal title="Enter your question" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input onChange={(e) => onTitleChange(e.target.value)} />
        <TextArea rows={4} placeholder="maxLength is 6" onChange={(e) => onQuestionChange(e.target.value)} />
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
