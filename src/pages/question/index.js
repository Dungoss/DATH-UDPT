import React, { useEffect } from 'react';
import { Table, Input, Button, Select, Modal } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import configs from '../../config/config.cfg';
import { QuestionDetail } from '../../components';
import * as questionActions from '../../redux/questionSlice';
import * as pageActions from '../../redux/selectMenuSidebarSlice';
import './styles.css';
import { IconPop, IconHot } from '../../utils/constants/img';
import { useStateContext } from '../../contexts/contextProvider';

const { Search } = Input;
const Question = () => {
  const dispatch = useDispatch();
  let tagOptions = [];

  const {
    setIsActive,
    openDetail,
    setOpenDetail,
    setDetailQuestion,
    data,
    setData,
    isModalWarningOpen,
    setIsModalWarningOpen,
  } = useStateContext();
  const userData = useSelector((state) => state.question.usersData);
  const categoryData = useSelector((state) => state.question.categoryData);
  const tagData = useSelector((state) => state.question.tagData);

  const questData = useSelector((state) => state.question.questionData);

  useEffect(() => {
    setData(questData);
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

  const handleOkWarning = () => {
    setIsModalWarningOpen(false);
    window.location.href = '/login';
  };
  const handleCancelWarning = () => {
    setIsModalWarningOpen(false);
  };

  const findTagNameById = (data, targetId) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].tagID === targetId) {
        return data[i].tagName;
      }
    }
    return null;
  };

  const onSearch = async (value) => {
    dispatch(questionActions.setLoadingChild(true));
    const response = await axios.get(`${configs.questionService}/api/questions/search-keyword?keyword=${value}`);
    setData(response.data);
    dispatch(questionActions.setLoadingChild(false));
  };

  const handleFilterByTag = async (value) => {
    dispatch(questionActions.setLoadingChild(true));
    const response = await axios.get(`${configs.questionService}/api/questions/search-tag?tagID="${value}"`);
    setData(response.data);
    dispatch(questionActions.setLoadingChild(false));
  };

  let questionData = [];
  const handleToQuestionDetail = () => {
    setIsActive(1);
    dispatch(pageActions.setActivePane('question'));
    setOpenDetail(true);
  };

  console.log(configs.userSerivce);

  const onExport = async () => {
    window.open(`${configs.bonusSerivce}/api/export-excel-csv-file`, '_blank');
  };

  const columns = [
    {
      title: (
        <div>
          <h1>Question</h1>
          <div className="spread">
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
            <div>
              <Button onClick={onExport}>Export</Button>
            </div>
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
      {openDetail == true && <QuestionDetail />}
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
      <Modal title="Basic Modal" open={isModalWarningOpen} onOk={handleOkWarning} onCancel={handleCancelWarning}>
        <p>Please login first!</p>
      </Modal>
    </div>
  );
};

export { Question };
