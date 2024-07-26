import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, TreeSelect, message, Popconfirm } from 'antd';
import { getCategories, createCategory, updateCategory, deleteCategory, getCategoryByName } from '../../api/api-server';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const { Option } = Select;

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      setTreeData(transformToTreeData(response.data));
    } catch (error) {
      message.error('Không thể lấy danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  const transformToTreeData = (categories) => {
    return categories.map(category => ({
      title: category.name,
      value: category.id,
      children: category.children.length > 0 ? transformToTreeData(category.children) : null
    }));
  };

  const handleAddOrUpdateCategory = async (values) => {
    if (!values.parent_id) {
      values.parent_id = null;
    }

    try {
      if (isEditing) {
        await updateCategory(editingCategory.id, values);
        message.success('Cập nhật danh mục thành công');
      } else {
        // Kiểm tra xem tên danh mục đã tồn tại chưa
        const existingCategory = await getCategoryByName(values.name);
        if (existingCategory && existingCategory.status === 'Inactive') {
          // Cập nhật danh mục không hoạt động hiện tại
          await updateCategory(existingCategory.id, { ...values, status: 'Active' });
          message.success('Danh mục đã tồn tại và được kích hoạt lại');
        } else {
          await createCategory(values);
          message.success('Thêm danh mục thành công');
        }
      }
      fetchCategories();
      setIsModalVisible(false);
      form.resetFields();
      setIsEditing(false);
      setEditingCategory(null);
    } catch (error) {
      message.error(isEditing ? 'Không thể cập nhật danh mục' : 'Không thể thêm danh mục');
      console.error('Error:', error.response.data);

      const errorData = error.response.data;
      if (errorData && errorData.data) {
        for (const key in errorData.data) {
          if (errorData.data.hasOwnProperty(key)) {
            message.error(`${key}: ${errorData.data[key]}`);
          }
        }
      }
    }
  };

  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategory(category);
    form.setFieldsValue(category);
    setIsModalVisible(true);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      message.success('Xóa danh mục thành công');
      fetchCategories();
    } catch (error) {
      message.error('Không thể xóa danh mục');
      console.error('Error deleting category:', error.response.data);
    }
  };

  // Filter out inactive categories for display
  const activeCategories = categories.filter(category => category.status === 'Active');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button className="text-blue-500 hover:text-blue-700" type="link" onClick={() => handleEditCategory(record)}>Sửa</Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa danh mục này không?"
            onConfirm={() => handleDeleteCategory(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button className="text-red-500 hover:text-red-700" type="link" danger>Xóa</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="p-4">
      <Button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="primary" onClick={() => setIsModalVisible(true)}>
        Thêm Danh Mục
      </Button>
      <Table
        columns={columns}
        dataSource={activeCategories} // Use only active categories for table
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <Modal
        title={isEditing ? "Cập Nhật Danh Mục" : "Thêm Danh Mục"}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsEditing(false);
          setEditingCategory(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrUpdateCategory} layout="vertical">
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input className="border rounded py-2 px-3 w-full" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input className="border rounded py-2 px-3 w-full" />
          </Form.Item>
          <Form.Item
            name="parent_id"
            label="Danh Mục"
          >
            <TreeSelect
              className="w-full"
              treeData={treeData} // Allow all categories in TreeSelect
              allowClear
              placeholder="Không có"
              treeDefaultExpandAll
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select className="w-full">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="primary" htmlType="submit">
              {isEditing ? "Cập Nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoriesList;
