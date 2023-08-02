import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import { EditOutlined, PlusSquareFilled } from '@ant-design/icons';
import axios from 'axios';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import * as questionActions from '../../redux/questionSlice';

const Category = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.question.categoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let temp = { categoryName: newCategory };
    const response = await axios.post('http://localhost:8002/api/category', temp);
    let temp1 = _.cloneDeep(categoryData);
    temp1.push(temp);
    if (response.status == 201) {
      dispatch(questionActions.setCategory(temp1));
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let tableData = [];
  const columns = [
    {
      title: (
        <div>
          <PlusSquareFilled onClick={showModal} />
        </div>
      ),
      dataIndex: 'category',
      key: 'category',
    },
  ];
  const paginationConfig = {
    pageSize: 7,
  };

  const onNewCategoryChange = (val) => {
    setNewCategory(val);
  };

  return (
    <div>
      {tableData && <Table dataSource={tableData} columns={columns} pagination={paginationConfig} />}
      {categoryData.map((_data, _idx) => {
        tableData.push({
          key: _idx + 1,
          category: (
            <div>
              <div>{_data.categoryName}</div>
              <div>
                <EditOutlined />
              </div>
            </div>
          ),
        });
      })}
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input onChange={(e) => onNewCategoryChange(e.target.value)} />
      </Modal>
    </div>
  );
};

export { Category };
