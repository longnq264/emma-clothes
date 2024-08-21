import { Form, Input } from "antd";

const UserInput = () => {
  return (
    <>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Tên khách hàng" className="py-2" />
      </Form.Item>

      <Form.Item
        name="phone_number"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input placeholder="Số điện thoại" className="py-2" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input placeholder="Địa chỉ email (không bắt buộc)" className="py-2" />
      </Form.Item>
    </>
  );
};

export default UserInput;
