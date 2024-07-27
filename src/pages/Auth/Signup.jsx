import { Button, Form, Input, DatePicker, Checkbox } from "antd";
import { useState } from "react";
import { register } from "../../api/api-server";

const Signup = () => {
  const [state, setState] = useState([]);
  console.log(state);
  const [notification, setNotification] = useState("");
  const onFinish = async (values) => {
    console.log("Success:", values);
    const formData = {
      ...values,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };
    console.log(formData);
    // // console.log(formData);
    try {
      const response = await register(formData);
      console.log("response", response);
      setState(response.data);
      const token = response.token;
      localStorage.setItem("token", token);
      setNotification(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-gradient-to-r from-orange-500 to-blue-500 min-h-screen">
      <h1 className="font-bold text-center text-white text-4xl mb-8">Signup</h1>
      <div className="form flex justify-center">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="bg-white p-10 rounded-lg shadow-lg max-w-md"
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Re Password"
            name="re_password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item label="DatePicker" name="date_of_birth">
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <h2>{notification}</h2>
    </div>
  );
};

export default Signup;
