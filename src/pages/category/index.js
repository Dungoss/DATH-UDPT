import React, { useState } from 'react';
import { Table, Modal, Button, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import configs from '../../config/config.cfg';
import './styles.css';
import * as questionActions from '../../redux/questionSlice';

const Category = () => {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.question.categoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState({});
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let temp = { categoryName: newCategory };
    const response = await axios.post(`${configs.otherSerivce}/api/category`, temp);
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

  const handleOkEdit = async () => {
    let temp = { categoryName: editCategory.categoryName };
    const response = await axios.put(`${configs.otherSerivce}/api/category/${editCategory.categoryID}`, temp);
    let temp1 = _.cloneDeep(categoryData);
    temp1.push(temp);
    if (response.status == 201) {
      dispatch(questionActions.setCategory(temp1));
    }
    setIsModalEditOpen(false);
  };
  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  let tableData = [];
  const columns = [
    {
      title: (
        <div>
          <Button className="AddCategory" onClick={showModal}>
            Add category
          </Button>
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

  const onEditCategoryChange = (val) => {
    setIsModalEditOpen(true);
    setEditCategory(val);
  };

  return (
    <div className="category">
      {tableData && <Table dataSource={tableData} columns={columns} pagination={paginationConfig} />}
      {categoryData.map((_data, _idx) => {
        tableData.push({
          key: _idx + 1,
          category: (
            <div className="category-list">
              <div>{_data.categoryName}</div>
              <div className="category-icon">
                <EditOutlined onClick={() => onEditCategoryChange(_data)} />
              </div>
            </div>
          ),
        });
      })}
      <Modal title="Add new category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder={'Enter category name'} onChange={(e) => onNewCategoryChange(e.target.value)} />
      </Modal>
      <Modal title="Edit category" open={isModalEditOpen} onOk={handleOkEdit} onCancel={handleCancelEdit}>
        <Input
          defaultValue={editCategory.categoryName}
          placeholder={'Enter category name'}
          onChange={(e) => onNewCategoryChange(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export { Category };
