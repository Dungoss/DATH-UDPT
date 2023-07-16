import React, { useState } from 'react';
import { Table, Modal } from 'antd';
import { EditOutlined, PlusSquareFilled } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Category = () => {
  const categoryData = useSelector((state) => state.question.categoryData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    let temp = { categoryName: newCategory };
    const response = await axios.post('http://localhost:8000/api/category', temp);
    console.log(response);
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
