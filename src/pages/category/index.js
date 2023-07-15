import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { EditOutlined, PlusSquareFilled } from '@ant-design/icons';
import axios from 'axios';

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/category`);
        setCategoryData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);
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
