import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authThunk";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };
    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 min-h-screen pt-10">
        <h1 className="font-bold text-center text-white text-4xl mb-8">
          Login
        </h1>
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className="mb-4 block text-sm font-medium text-gray-700"
            >
              <Input className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
              <Input.Password className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              className="flex items-center justify-center"
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={status === "loading"}
                className="w-full flex justify-center py-2 px-10 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </Button>
            </Form.Item>
            {error && <div>Error</div>}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signin;
