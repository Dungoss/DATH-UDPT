import React from 'react';
import { Table } from 'antd';

const Question = () => {
  const dataFetch = [
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
    {
      userName: '@dung',
      title: 'Test title',
      content: 'test content',
    },
  ];

  let questionData = [];
  const columns = [
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
    },
  ];
  const paginationConfig = {
    pageSize: 7,
  };
  return (
    <div>
      <div>
        <Table dataSource={questionData} columns={columns} pagination={paginationConfig} />
        {dataFetch.map((_data, _idx) => {
          questionData.push({
            key: _idx + 1,
            questions: (
              <div>
                <div>
                  <span>{_data.userName}</span>
                </div>
                <div>
                  <span>{_data.title}</span>
                </div>
                <div>
                  <span>{_data.content}</span>
                </div>
              </div>
            ),
          });
        })}
      </div>
    </div>
  );
};

export { Question };
