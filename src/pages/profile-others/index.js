import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Table, Modal } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

import configs from '../../config/config.cfg';
import './styles.css';
import { QuestionDetail } from '../../components';
import { useStateContext } from '../../contexts/contextProvider';

const ProfileOther = () => {
  const userData = JSON.parse(localStorage.getItem('profile'));
  console.log(userData);
  const imgRef = useRef(null);

  const { openDetail, setOpenDetail, setDetailQuestion, isModalWarningOpen, setIsModalWarningOpen } = useStateContext();

  const [showAva, setShowAva] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);

  const [questData, setQuestData] = useState([]);
  const usersData = useSelector((state) => state.question.usersData);
  const tagData = useSelector((state) => state.question.tagData);
  const categoryData = useSelector((state) => state.question.categoryData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${configs.userSerivce}/api/users/${userData.id}/questions`);
        setQuestData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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

  const tabs = [{ name: 'Questions' }, { name: 'Info' }];

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

  const handleToQuestionDetail = () => {
    setOpenDetail(true);
  };

  const handleOkWarning = () => {
    setIsModalWarningOpen(false);
    window.location.href = '/login';
  };
  const handleCancelWarning = () => {
    setIsModalWarningOpen(false);
  };

  let questionData = [];
  const columns = [
    {
      title: (
        <div>
          <h1>Questions of {userData.name}</h1>
        </div>
      ),
      dataIndex: 'questions',
      key: 'questions',
    },
  ];
  const paginationConfig = {
    pageSize: 7,
  };

  const handleOkshowAva = () => {
    setShowAva(false);
  };
  const handleCancel = () => {
    setShowAva(false);
  };

  const handleOkshowWallpaper = () => {
    setShowWallpaper(false);
  };
  const handleCancelshowWallpaper = () => {
    setShowWallpaper(false);
  };
  const modalWidth = imgRef.current ? imgRef.current.width : 600;
  const modalHeight = imgRef.current ? imgRef.current.height : 400;

  return (
    <div className="profile-container">
      <div className="wall-paper">
        <img onClick={() => setShowWallpaper(true)} src={userData.wallpaper} className="resized-image" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <div className="avatar">
          <img onClick={() => setShowAva(true)} src={userData && userData.avatar} />
        </div>
        <div className="basic-info">
          <span>{userData && userData.name}</span>
          <span>
            {userData &&
              userData.question_count &&
              userData.answer_count &&
              (() => {
                const { question_count, answer_count } = userData;
                let level;

                if (question_count > 40 && answer_count > 20) {
                  level = 'Level 5';
                } else if (question_count > 30 && answer_count > 15) {
                  level = 'Level 4';
                } else if (question_count > 20 && answer_count > 10) {
                  level = 'Level 3';
                } else if (question_count > 10 && answer_count > 5) {
                  level = 'Level 2';
                } else {
                  level = 'Level 1';
                }

                return level;
              })()}
          </span>
        </div>
      </div>

      <div className="profile-content">
        <div>
          <Tabs
            defaultActiveKey="0"
            tabPosition={'left'}
            style={{
              height: 220,
            }}
            items={tabs.map((_, i) => {
              const id = String(i);
              return {
                label: `${_.name}`,
                key: id,
                children: (
                  <div>
                    {id === '0' ? (
                      <div className="profile-question">
                        {openDetail == true && <QuestionDetail />}
                        {openDetail == false && (
                          <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
                        )}
                        {questData &&
                          questData.map((_data, _idx) => {
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
                                      <div className="question-category">
                                        {findCategoryById(categoryData, _data.categoryID)}
                                      </div>
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
                                        <img src={findAvatarById(usersData, _data.userID)} />
                                        <span>{findNameById(usersData, _data.userID)}</span>
                                        <b>1</b>
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
                    ) : (
                      <div className="profile-question"></div>
                    )}
                  </div>
                ),
              };
            })}
          />
        </div>
      </div>
      <img style={{ display: 'none' }} ref={imgRef} src={userData.wallpaper} />
      <Modal open={showAva} onOk={handleOkshowAva} onCancel={handleCancel} width={280} height={200} footer={null}>
        <img style={{ width: '200px', height: '200px' }} src={userData.avatar}></img>
      </Modal>
      <Modal
        open={showWallpaper}
        onOk={handleOkshowWallpaper}
        onCancel={handleCancelshowWallpaper}
        width={modalWidth + 80}
        height={modalHeight}
        footer={null}
      >
        <img src={userData.wallpaper}></img>
      </Modal>
      <Modal title="Basic Modal" open={isModalWarningOpen} onOk={handleOkWarning} onCancel={handleCancelWarning}>
        <p>Please login first!</p>
      </Modal>
    </div>
  );
};

export { ProfileOther };
