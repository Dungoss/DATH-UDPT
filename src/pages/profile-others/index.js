import React, { useEffect, useState } from 'react';
import { Tabs, Table } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

import configs from '../../config/config.cfg';
import './styles.css';

const ProfileOther = () => {
  const userData = JSON.parse(localStorage.getItem('profile'));

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
    </div>
  );
};

export { ProfileOther };
