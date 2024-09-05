import { useState, useEffect } from 'react';
import { Form, Input, Button, notification, TreeSelect, Card, Space, Select } from 'antd';
import { createCategory, getCategories } from '../../../api/api-server'; // Điều chỉnh đường dẫn nếu cần
import { useNavigate } from 'react-router-dom';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoriesAdd = () => {
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('Phản hồi từ API:', response);
        if (response.data && Array.isArray(response.data)) {
          const rootCategory = response.data.find(category => category.id === 1); // Tìm danh mục gốc có id = 1
          if (rootCategory) {
            const formattedData = formatTreeData(rootCategory.children);
            console.log('Dữ liệu cây đã được định dạng:', formattedData);
            setTreeData(formattedData);
          }
        } else {
          console.error('Đã mong đợi một mảng các danh mục nhưng nhận được:', response);
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
    // Nếu không chọn danh mục nào thì đặt parent_id là 1 (danh mục gốc)
    if (!values.parent_id) {
      values.parent_id = 1;
    }

    try {
      console.log('Giá trị của form:', values); // Log giá trị của form để kiểm tra
      const response = await createCategory(values);
      console.log('Phản hồi khi tạo danh mục:', response);
      notification.success({ message: 'Danh mục đã được thêm thành công!' });
      form.resetFields();
      navigate('/admin/categories'); // Điều hướng về danh sách danh mục sau khi thêm thành công
    } catch (error) {
      console.error('Lỗi trong quá trình tạo danh mục:', error); // Log chi tiết lỗi
      if (error.response && error.response.data) {
        console.error('Phản hồi từ máy chủ:', error.response.data);
        notification.error({ message: 'Lỗi khi thêm danh mục!', description: error.response.data.message });
      } else {
        notification.error({ message: 'Lỗi khi thêm danh mục!', description: error.message });
      }
    }
  };

  const onExit = () => {
    navigate('/admin/categories'); // Điều hướng về danh sách danh mục
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
            <Input prefix={<PlusOutlined />} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]} // Thêm quy tắc yêu cầu nhập mô tả
          >
            <Input.TextArea prefix={<PlusOutlined />} />
          </Form.Item>
          <Form.Item
            name="parent_id"
            label="Danh Mục"
          >
            <TreeSelect
              treeData={treeData}
              placeholder="Chọn danh mục (Mặc định danh mục gốc nếu không chọn)"
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
              <Option value="Active">Hoạt động</Option>
              <Option value="Inactive">Không hoạt động</Option>
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Thêm
              </Button>
              <Button type="default" onClick={() => form.resetFields()} icon={<ReloadOutlined />}>
                Làm mới
              </Button>
              <Button type="default" onClick={onExit} >
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
