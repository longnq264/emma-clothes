import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message, Card, Spin } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, CalendarOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { updateUser, getUsers } from '../../../api/users';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await getUsers();
      const user = response.data.data.find((user) => user.id === parseInt(id));
      if (user) {
        form.setFieldsValue({
          name: user.name,
          email: user.email,
          role: user.role,
          date_of_birth: user.date_of_birth ? moment(user.date_of_birth) : null,
          address: user.address,
          phone_number: user.phone_number,
        });
        setLoading(false);
      } else {
        message.error('Người dùng không tồn tại.');
        navigate('/admin/users');
      }
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu người dùng.');
      setLoading(false);
    }
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      await updateUser(id, values);
      message.success('Cập nhật người dùng thành công');
      navigate('/admin/users');
    } catch (error) {
      message.error('Lỗi khi cập nhật người dùng.');
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
      <Card title="Chỉnh sửa thông tin người dùng" style={{ maxWidth: 600, margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên người dùng' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email người dùng" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Vai trò"
            rules={[{ required: true, message: 'Vui lòng chọn vai trò của người dùng' }]}
          >
            <Select placeholder="Chọn vai trò">
              <Option value="admin">Quản trị viên</Option>
              <Option value="user">Người dùng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date_of_birth"
            label="Ngày sinh"
            rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
          >
            <DatePicker
              prefix={<CalendarOutlined />}
              format="YYYY-MM-DD"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ người dùng" />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
          </Form.Item>
          <Form.Item
            name="re_password"
            label="Nhập lại mật khẩu"
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={formLoading}
              style={{ width: '100%' }}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
        <Button
          type="link"
          onClick={() => navigate('/admin/users')}
          style={{ marginTop: '16px' }}
        >
          Quay lại danh sách người dùng
        </Button>
      </Card>
    </div>
  );
};

export default EditUser;
