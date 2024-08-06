 
import { Form, Input, Button, Card } from 'antd';
import { addBanner } from '../../../api/banner';
import { useNavigate } from 'react-router-dom';

const AddBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await addBanner(values);
    navigate('/admin/banners');
  };

  return (
    <Card title="Add New Banner" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ title: '', description: '', image_url: '' }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Enter banner title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <Input placeholder="Enter banner description" />
        </Form.Item>
        <Form.Item
          name="image_url"
          label="Image URL"
          rules={[{ required: true, message: 'Please input the image URL!' }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddBanner;
