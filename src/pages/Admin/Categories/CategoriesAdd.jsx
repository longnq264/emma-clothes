import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { createCategory, getCategories } from "../../../api/api-server";

const { Option } = Select;

const CategoryAdd = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setCategories([]);
        console.error('API response is not an array:', response);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setCategories([]);
    }
  };

  const onFinish = async (values) => {
    try {
      await createCategory(values);
      message.success('Category created successfully');
    } catch (error) {
      console.error('Failed to create category:', error);
      message.error('Failed to create category');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">Create New Category</h1>
      <Form
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter the category name' }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter the category description' }]}
        >
          <Input.TextArea placeholder="Enter category description" />
        </Form.Item>

        <Form.Item
          name="parent_id"
          label="Parent Category"
        >
          <Select placeholder="Select parent category" allowClear>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select the status' }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CategoryAdd;
