import moment from 'moment';
import { Form, Input, Button, DatePicker, Card, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
  HomeOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { addUser } from "../../../api/users";
import { useNavigate } from "react-router-dom";

const { Item: FormItem } = Form;

const AddUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
        const userData = {
            ...values,
            // Format date_of_birth to 'YYYY-MM-DD' format
            date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
            role: 'user', // Default role
        };
        const response = await addUser(userData);

        if (response.status === false) {
            // Log the error for debugging
            console.log('Error from API:', response.error);
            // Display a user-friendly message
            message.error(response.message || 'Lỗi không xác định');
        } else {
            message.success('Thêm người dùng thành công');
            navigate('/admin/users');
        }
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            message.error(`Lỗi: ${error.response.data.error}`);
        } else {
            message.error('Lỗi khi gửi biểu mẫu.');
        }
    }
};

  return (
    <Card
      title="Thêm Người Dùng Mới"
      bordered={false}
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <FormItem
          name="name"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên người dùng" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập tên người dùng" />
        </FormItem>
        <FormItem
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email người dùng" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            placeholder="Nhập email người dùng"
          />
        </FormItem>
        <FormItem
          name="password"
          label="Mật khẩu"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
          />
        </FormItem>
        <FormItem
          name="re_password"
          label="Xác nhận mật khẩu"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Xác nhận mật khẩu"
          />
        </FormItem>
        <FormItem
          name="date_of_birth"
          label="Ngày sinh"
          rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
        >
          <DatePicker
            prefix={<CalendarOutlined />}
            format="YYYY-MM-DD"
            placeholder="Chọn ngày sinh"
            style={{ width: "100%" }}
          />
        </FormItem>
        <FormItem
          name="address"
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        >
          <Input prefix={<HomeOutlined />} placeholder="Nhập địa chỉ" />
        </FormItem>
        <FormItem
          name="phone_number"
          label="Số điện thoại"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block>
            Thêm Người Dùng
          </Button>
        </FormItem>
      </Form>
      <Button
        onClick={() => navigate("/admin/users")}
        style={{ marginTop: "16px" }}
        block
      >
        Quay lại danh sách người dùng
      </Button>
    </Card>
  );
};

export default AddUser;
