import React, { useState, useRef } from 'react';
import { Tabs, Table, Modal, Button } from 'antd';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import configs from '../../config/config.cfg';
import './styles.css';
import AuthUser from '../../components/auth/AuthUser';
import * as questionActions from '../../redux/questionSlice';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import { Camera } from '../../utils/constants/img';
import { useStateContext } from '../../contexts/contextProvider';
import { QuestionDetail } from '../../components';

const uploader = Uploader({
  apiKey: 'public_W142iARCb7TLAftdNLcvcZ23CYvn',
});

const options = { multi: false };

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = AuthUser();

  const imgRef = useRef(null);

  const [showAva, setShowAva] = useState(false);
  const [showWallpaper, setShowWallpaper] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { setDetailQuestion, openDetail, setOpenDetail, setIsActive } = useStateContext();

  const userData = useSelector((state) => state.question.userDetail);
  const categoryData = useSelector((state) => state.question.categoryData);
  const questData = useSelector((state) => state.question.questionUserData);
  const tagData = useSelector((state) => state.question.tagData);
  const tabs = [{ name: 'Questions' }, { name: 'Info' }];

  const [changePassword, setChangePassword] = useState({
    current_password: '',
    new_password: '',
  });

  const onChange = (prop, val) => {
    setChangePassword((prevState) => ({
      ...prevState,
      [prop]: val,
    }));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    dispatch(questionActions.setLoadingChild(true));
    const res = axios.post(`${configs.userSerivce}/api/users/${user.id}/change-password`, {
      current_password: changePassword.current_password,
      new_password: changePassword.new_password,
    });
    dispatch(questionActions.setLoadingChild(false));
    console.log(res);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

  const handleUploadAvatar = async (imgUrl) => {
    const response = await axios.post(`${configs.userSerivce}/api/users/${user.id}/update-avatar`, {
      avatar: imgUrl,
      userId: user.id,
    });
    if (response.status == 200) {
      let temp = _.cloneDeep(userData);
      temp.avatar = imgUrl;
      dispatch(questionActions.setUserDetail(temp));
    }
  };

  const handleToQuestionDetail = () => {
    setIsActive(1);
    dispatch(pageActions.setActivePane('question'));
    setOpenDetail(true);
  };

  const handleUploadWallpaper = async (imgUrl) => {
    const response = await axios.post(`${configs.userSerivce}/api/users/${user.id}/update-wallpaper`, {
      wallpaper: imgUrl,
      userId: user.id,
    });
    if (response.status == 200) {
      let temp = _.cloneDeep(userData);
      temp.wallpaper = imgUrl;
      dispatch(questionActions.setUserDetail(temp));
    }
  };

  const findCategoryById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].categoryID === targetId) {
        return data[i].categoryName;
      }
    }
    return null;
  };

  let questionData = [];
  const columns = [
    {
      title: (
        <div>
          <h1>Questions you have asked</h1>
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
  const handleCancelAva = () => {
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
    <div className="profilee">
      <div className="profile-container">
        <div className="wall-paper">
          <img src={userData.wallpaper} onClick={() => setShowWallpaper(true)} className="resized-image" />
          <UploadButton
            uploader={uploader}
            options={options}
            onComplete={(files) => files.map((x) => handleUploadWallpaper(x.fileUrl))}
          >
            {({ onClick }) => (
              <button className="change-wall" onClick={onClick}>
                <img src={Camera} alt="Change Wallpaper"></img>
              </button>
            )}
          </UploadButton>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <div className="avatar">
            <img onClick={() => setShowAva(true)} src={userData && userData.avatar} />
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) => files.map((x) => handleUploadAvatar(x.fileUrl))}
            >
              {({ onClick }) => (
                <button className="change-ava" onClick={onClick}>
                  <img src={Camera} style={{ width: '50px', height: '50px' }} alt="Change Wallpaper"></img>
                </button>
              )}
            </UploadButton>
          </div>

          <div className="basic-info">
            <span className="name">{userData && userData.name}</span>
            <span className="level">
              {userData &&
                userData.question_count &&
                userData.answer_count &&
                (() => {
                  const { question_count, answer_count } = userData;
                  let level = 'Level 1';

                  if ((question_count > 40 && answer_count > 20) || question_count > 45) {
                    level = 'Level 5';
                  } else if ((question_count > 30 && answer_count > 15) || question_count > 35 || answer_count > 35) {
                    level = 'Level 4';
                  } else if ((question_count > 20 && answer_count > 10) || question_count > 25 || answer_count > 25) {
                    level = 'Level 3';
                  } else if ((question_count > 10 && answer_count > 5) || question_count > 15 || answer_count > 15) {
                    level = 'Level 2';
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
                                          <img src={userData.avatar} />
                                          <span>{userData.name}</span>
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
                      ) : (
                        <div className="profile-question">
                          <table className="profile-question-list">
                            <tbody>
                              <tr>
                                <td className="title">Username:</td>
                                <td className="info">{userData.name}</td>
                              </tr>
                              <tr>
                                <td className="title">Email address:</td>
                                <td className="info">{userData.email}</td>
                              </tr>
                              <tr>
                                <td className="title">Total questions:</td>
                                <td className="info">{userData.question_count}</td>
                              </tr>
                              <tr>
                                <td className="title">Total answers:</td>
                                <td className="info">{userData.answer_count}</td>
                              </tr>
                              <tr>
                                <td className="title">Role:</td>
                                <td className="info">{userData.role}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div className="profile-question-button">
                            <Button onClick={showModal} className="btn">
                              Đổi mật khẩu
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ),
                };
              })}
            />
          </div>
        </div>
      </div>
      <img style={{ display: 'none' }} ref={imgRef} src={userData.wallpaper} />
      <Modal open={showAva} onOk={handleOkshowAva} onCancel={handleCancelAva} width={280} height={200} footer={null}>
        <img style={{ width: '200px', height: '200px', borderRadius: '4px' }} src={userData.avatar}></img>
      </Modal>
      <Modal
        open={showWallpaper}
        onOk={handleOkshowWallpaper}
        onCancel={handleCancelshowWallpaper}
        width={modalWidth + 80}
        height={modalHeight}
        footer={null}
      >
        <img style={{ borderRadius: '4px' }} src={userData.wallpaper}></img>
      </Modal>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input type="text" onChange={(e) => onChange('current_password', e.target.value)}></input>
        <input type="text" onChange={(e) => onChange('new_password', e.target.value)}></input>
      </Modal>
    </div>
  );
};

export { Profile };
