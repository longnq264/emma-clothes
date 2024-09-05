import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  TreeSelect,
  Card,
  Space,
  Select,
} from 'antd';
import { getCategory, updateCategory, getCategories } from '../../../api/api-server';
import { useParams, useNavigate } from 'react-router-dom';
import { SaveOutlined, ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;

const CategoriesEdit = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategory(id);
        const category = response.data;

        console.log('Danh mục đã lấy:', category);

        if (!category) {
          throw new Error('Không tìm thấy danh mục với ID đã cho');
        }

        const status =
          typeof category.status === 'string'
            ? category.status.toLowerCase()
            : 'Inactive';

        form.setFieldsValue({
          name: category.name,
          description: category.description,
          parent_id: category.parent_id,
          status: status,
        });

        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        notification.error({
          message: 'Lỗi khi tải danh mục!',
          description: error.message,
        });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        console.log('API response:', response);
        if (response.data && Array.isArray(response.data)) {
          const rootCategory = response.data.find(category => category.id === 1);
          if (rootCategory) {
            const formattedData = formatTreeData(rootCategory.children);
            console.log('Dữ liệu cây đã được định dạng:', formattedData);
            setTreeData(formattedData);
          }
        } else {
          console.error('Đã mong đợi một mảng các danh mục nhưng nhận được:', response);
        }
      } catch (error) {
        notification.error({
          message: 'Lỗi khi tải danh sách danh mục!',
          description: error.message,
        });
      }
    };

    fetchCategory();
    fetchCategories();
  }, [id, form]);

  const formatTreeData = (categories) => {
    return categories.map((category) => ({
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
      console.log('Giá trị form:', values);
      const response = await updateCategory(id, values);
      console.log('Cập nhật danh mục:', response);
      notification.success({
        message: 'Danh mục đã được cập nhật thành công!',
      });
      navigate('/admin/categories');
    } catch (error) {
      console.error('Lỗi khi cập nhật danh mục:', error);
      if (error.response && error.response.data) {
        console.error('Phản hồi từ server:', error.response.data);
        notification.error({
          message: 'Lỗi khi cập nhật danh mục!',
          description: error.response.data.message,
        });
      } else {
        notification.error({
          message: 'Lỗi khi cập nhật danh mục!',
          description: error.message,
        });
      }
    }
  };

  const onExit = () => {
    navigate('/admin/categories');
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Card
        title="Chỉnh Sửa Danh Mục"
        bordered={false}
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Tên Danh Mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô Tả">
            <Input.TextArea />
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
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Cập Nhật
              </Button>
              <Button type="default" onClick={() => form.resetFields()} icon={<ReloadOutlined />}>
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

export default CategoriesEdit;
