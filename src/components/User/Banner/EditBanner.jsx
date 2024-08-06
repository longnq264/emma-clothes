// src/components/EditBanner.jsx
import { useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { updateBanner, getBanners } from '../../../api/banner';
import { useNavigate, useParams } from 'react-router-dom';

const EditBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await getBanners();
      const banner = response.data.data.find((item) => item.id === parseInt(id));
      form.setFieldsValue(banner);
    };
    fetchBanner();
  }, [id, form]);

  const onFinish = async (values) => {
    await updateBanner(id, values);
    navigate('/admin/banners');
  };

  return (
    <Card title="Edit Banner" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
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

export default EditBanner;
