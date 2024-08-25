import { useEffect } from 'react';
import { Form, Input, Button, Card, Switch, message } from 'antd';
import { getBanners, updateBanner, toggleBannerStatus } from '../../../api/banner';
import { useNavigate, useParams } from 'react-router-dom';

const EditBanner = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await getBanners();
        const banner = response.data.find((item) => item.id === parseInt(id));
        if (banner) {
          form.setFieldsValue(banner);
        } else {
          message.error('Không tìm thấy banner');
          navigate('/admin/banners');
        }
      } catch (error) {
        message.error('Lấy thông tin banner thất bại');
      }
    };

    fetchBanner();
  }, [id, form, navigate]);

  const onFinish = async (values) => {
    try {
      await updateBanner(id, values);
      message.success('Cập nhật banner thành công');
      navigate('/admin/banners');
    } catch (error) {
      message.error('Cập nhật banner thất bại');
    }
  };

  const handleToggleStatus = async (checked) => {
    try {
      await toggleBannerStatus(id, { active: checked ? 1 : 0 });
      message.success('Cập nhật trạng thái banner thành công');
      // Cập nhật giá trị trong form để đồng bộ với trạng thái của switch
      form.setFieldsValue({ active: checked });
    } catch (error) {
      message.error('Cập nhật trạng thái banner thất bại');
    }
  };

  return (
    <Card title="Chỉnh sửa Banner" style={{ maxWidth: 600, margin: 'auto' }}>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ active: false }} // Đảm bảo rằng switch có giá trị mặc định
      >
        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
        >
          <Input placeholder="Nhập tiêu đề banner" />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <Input placeholder="Nhập mô tả banner" />
        </Form.Item>
        <Form.Item
          name="image_url"
          label="URL Hình ảnh"
          rules={[{ required: true, message: 'Vui lòng nhập URL hình ảnh!' }]}
        >
          <Input placeholder="Nhập URL hình ảnh" />
        </Form.Item>
        <Form.Item
          name="active"
          label="Hoạt động"
          valuePropName="checked"
        >
          <Switch
            checked={form.getFieldValue('active')}
            onChange={handleToggleStatus} // Gọi hàm cập nhật trạng thái khi thay đổi
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditBanner;
