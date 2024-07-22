import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Space, Button, Modal, message, Tag } from 'antd';
import { getCategories, deleteCategory } from "../../../api/api-server";
 
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
      message.success('Category deleted successfully');
    } catch (error) {
      console.error('Failed to delete category:', error);
      message.error('Failed to delete category');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Parent ID',
      dataIndex: 'parent_id',
      key: 'parent_id',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/categories/${record.id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Button type="danger" onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const transformData = (data) => {
    return data.map(category => ({
      ...category,
      key: category.id,
      children: category.children.length ? transformData(category.children) : null,
    }));
  };

  const transformedData = transformData(categories);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Categories List</h1>
      <div className="overflow-x-auto">
        <Table columns={columns} dataSource={transformedData} pagination={false} />
      </div>
      <div className="mt-8">
        <Link to="/admin/categories/new">
          <Button type="primary">Create Category</Button>
        </Link>
      </div>
    </div>
  );
};

export default CategoriesList;
