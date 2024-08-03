import { Button, Form, Input } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SigninAdmin = () => {
  const { loginUser } = useContext(AppContext);

  const onFinish = async (values) => {
    console.log("values:", values);
    const formData = { ...values };

    try {
      await loginUser(formData);
      // Redirect to admin dashboard or show a success message
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="font-bold text-center text-gray-800 text-4xl mb-8">
          Đăng nhập
        </h1>
        <Form
          name="signin"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 24 }}
            className="flex items-center justify-center"
          >
            <Button
              type="primary"
              htmlType="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SigninAdmin;
