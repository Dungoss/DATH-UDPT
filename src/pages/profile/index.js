import React from 'react';
import { Tabs, Table } from 'antd';
import { Uploader } from 'uploader';
import { UploadButton } from 'react-uploader';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import configs from '../../config/config.cfg';
import './styles.css';
import AuthUser from '../../components/auth/AuthUser';
import * as questionActions from '../../redux/questionSlice';

const uploader = Uploader({
  apiKey: 'public_W142iARCb7TLAftdNLcvcZ23CYvn',
});

const options = { multi: false };

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = AuthUser();

  const userData = useSelector((state) => state.question.userDetail);
  const categoryData = useSelector((state) => state.question.categoryData);
  const questData = useSelector((state) => state.question.questionUserData);
  const tagData = useSelector((state) => state.question.tagData);
  const tabs = [{ name: 'Questions' }, { name: 'Info' }];

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

  return (
    <div className="profile-container">
      <div className="wall-paper">
        <img src={userData.wallpaper} className="resized-image" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div className="avatar">
          <img src={userData && userData.avatar} />
        </div>
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
      <UploadButton
        uploader={uploader}
        options={options}
        onComplete={(files) => files.map((x) => handleUploadAvatar(x.fileUrl))}
      >
        {({ onClick }) => <button onClick={onClick}>Change Avatar</button>}
      </UploadButton>
      <UploadButton
        uploader={uploader}
        options={options}
        onComplete={(files) => files.map((x) => handleUploadWallpaper(x.fileUrl))}
      >
        {({ onClick }) => <button onClick={onClick}>Change Wallpaper</button>}
      </UploadButton>
      <div className="edit-profile">EDIT PROFILE</div>
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
                        <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
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
                                    <div className="question-content-title">
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
    </div>
  );
};

export { Profile };
