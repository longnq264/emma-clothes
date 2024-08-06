 
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { addUser } from '../../../api/api-server';
 
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
      await addUser(values);
      message.success('Thêm người dùng thành công');
      navigate('/admin/users');
    } catch (error) {
      message.error('Lỗi khi gửi biểu mẫu.');
    }
  };

  return (
    <div>
      <Button onClick={() => navigate('/admin/users')} style={{ marginBottom: '16px' }}>
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
