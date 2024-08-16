import { Button, Form, Input, DatePicker, Checkbox } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(AppContext);

  const onFinish = async (values) => {
    const formData = {
      ...values,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };

    try {
      await registerUser(formData);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-pink-500 to-yellow-500">
      <div className="hidden lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <img
          src="https://images.unsplash.com/photo-1502720705741-8f1a0e89e6b8"
          alt="Fashion"
          className="w-full h-full object-cover rounded-l-lg shadow-lg"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 lg:w-1/2 lg:items-center lg:justify-center">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Create an Account
          </h1>
          <Form
            name="register"
            className="bg-white p-8 rounded-lg shadow-lg space-y-6"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please input your full name!" }]}
            >
              <Input
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Full Name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Email Address"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="re_password"
              rules={[{ required: true, message: "Please confirm your password!" }]}
            >
              <Input.Password
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              label="Date of Birth"
              name="date_of_birth"
            >
              <DatePicker
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              className="flex items-center"
            >
              <Checkbox className="text-gray-700">Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
