import { Form, Input, Button, Card, Switch } from 'antd';
import { addBanner } from '../../../api/banner';
import { useNavigate } from 'react-router-dom';

const AddBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await addBanner(values);
      navigate('/admin/banners');
    } catch (error) {
      console.error('Không thể thêm banner:', error);
    }
  };

  return (
    <Card title="Thêm Banner Mới" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ title: '', description: '', link: '', active: true }}
      >
        <Form.Item
          name="title"
          label="Tiêu Đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề banner" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô Tả"
        >
          <Input placeholder="Nhập mô tả banner" />
        </Form.Item>
        <Form.Item
          name="link"
          label="URL Hình Ảnh"
          rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
        >
          <Input placeholder="Nhập URL hình ảnh" />
        </Form.Item>
        <Form.Item
          name="active"
          label="Kích Hoạt"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBanner;
