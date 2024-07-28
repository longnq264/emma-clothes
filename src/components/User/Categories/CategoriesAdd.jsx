import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, TreeSelect, Card, Space, Select } from 'antd';
import { createCategory, getCategories } from '../../../api/api-server'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CategoriesAdd = () => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('API response:', response);
        if (response.data && Array.isArray(response.data)) {
          const rootCategory = response.data.find(category => category.id === 1);
          if (rootCategory) {
            const formattedData = formatTreeData(rootCategory.children);
            console.log('Formatted tree data:', formattedData);
            setTreeData(formattedData);
          }
        } else {
          console.error('Expected an array of categories but got:', response);
        }
      } catch (error) {
        notification.error({ message: 'Lỗi khi tải danh mục!', description: error.message });
      }
    };

    fetchCategories();
  }, []);

  const formatTreeData = (categories) => {
    return categories.map(category => ({
      title: category.name,
      value: category.id,
      children: category.children ? formatTreeData(category.children) : [],
    }));
  };

  const onFinish = async (values) => {
    try {
      console.log('Form values:', values); // Log form values to check what is being submitted
      const response = await createCategory(values);
      console.log('Create category response:', response);
      notification.success({ message: 'Danh mục đã được thêm thành công!' });
      form.resetFields();
      navigate('/admin/categories'); // Navigate to categories list after successful creation
    } catch (error) {
      console.error('Error during category creation:', error); // Log the error details
      if (error.response && error.response.data) {
        console.error('Server response:', error.response.data);
        notification.error({ message: 'Lỗi khi thêm danh mục!', description: error.response.data.message });
      } else {
        notification.error({ message: 'Lỗi khi thêm danh mục!', description: error.message });
      }
    }
  };

  const onExit = () => {
    navigate('/admin/categories'); // Navigate back to categories list
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Thêm Danh Mục" bordered={false} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} // Added required rule
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="parent_id"
            label="Danh Mục"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <TreeSelect
              treeData={treeData}
              placeholder="Chọn danh mục"
              treeDefaultExpandAll
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
              <Button type="default" onClick={() => form.resetFields()}>
                Làm mới
              </Button>
              <Button type="default" onClick={onExit}>
                Thoát
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CategoriesAdd;
