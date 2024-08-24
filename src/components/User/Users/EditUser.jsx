import { useState, useEffect } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { updateUser, getUsers } from '../../../api/api-server';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

const { Option } = Select;

const EditUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const user = await getUsers(id);
      form.setFieldsValue({
        ...user,
        date_of_birth: moment(user.date_of_birth),
      });
      setLoading(false);
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu người dùng.');
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      await updateUser(id, values);
      message.success('Cập nhật người dùng thành công');
      navigate('/users');
    } catch (error) {
      message.error('Lỗi khi cập nhật người dùng.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate('/users')} style={{ marginBottom: '16px' }}>
        Quay lại danh sách người dùng
      </Button>
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
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Vui lòng nhập email người dùng' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          name="role"
          label="Vai trò"
          rules={[{ required: true, message: 'Vui lòng chọn vai trò của người dùng' }]}
        >
          <Select>
            <Option value="admin">Quản trị viên</Option>
            <Option value="user">Người dùng</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="date_of_birth"
          label="Ngày sinh"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Số điện thoại"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
