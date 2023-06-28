import React from 'react';
import { Tabs, Table } from 'antd';
// import { useState } from 'react';

import { SearchBox } from '../../components';
import './styles.css';
import { IconLogo, IconPop, IconNew, IconHot } from '../../utils/constants/img';
// import { WallPaper } from '../../utils/constants/img';

const Profile = () => {
  const tabs = [{ name: 'Questions' }, { name: 'Info' }];

  const dataFetch = [
    {
      userName: '@dungduyle2001cvcfsa',
      title:
        'Test titleeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeee eeeeeeeeeeeee eeeeeeeeee',
      content:
        'test contenteeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee eeeeeeeeee eeeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeee eeeeeeeeeeee',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
  ];

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
    <div className="profile-container">
      <div className="wall-paper">{/* <img src={WallPaper} /> */}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div className="avatar"></div>
        <span>Nguyễn Lê Nguyên</span>
      </div>
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
                // disabled: i === 28,
                children: (
                  <div>
                    {id === '0' ? (
                      <div className="profile-question">
                        <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
                        {dataFetch.map((_data, _idx) => {
                          questionData.push({
                            key: _idx + 1,
                            questions: (
                              <div className="question">
                                <div className="question-info">
                                  <div className="question-info-user">
                                    <img src={IconLogo} />
                                    <b>{_data.userName}</b>
                                  </div>
                                  <h5>0 votes</h5>
                                  <h5>0 answers</h5>
                                </div>
                                <div className="question-content">
                                  <div className="question-content-title">
                                    <h2>{_data.title}</h2>
                                  </div>
                                  <div className="question-content-content">
                                    <span>{_data.content}</span>
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
                                      <span>Nguyen Ngu</span>
                                      <b>1</b>
                                      <span>asked 44 sec ago </span>
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
                    )}{' '}
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
