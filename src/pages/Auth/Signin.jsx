import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../store/authThunk";
import { getTokenFromLocalStorage } from "../../utils/indexUtils";
import { syncLocalCartToServer } from "../../store/cartThunk";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const { merged } = useSelector((state) => state.cart);

  const onFinish = async (values) => {
    const formData = {
      ...values,
    };

    try {
      await dispatch(loginUser(formData)).unwrap();
      const token = getTokenFromLocalStorage();
      console.log(merged);

      if (!merged) {
        // Đồng bộ giỏ hàng từ localStorage lên server
        await dispatch(syncLocalCartToServer(token)).unwrap();
      }
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-teal-400 to-green-300">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="text-center mb-6">
          <img
            alt="Company Logo"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="h-14 mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-gray-900">Đăng nhập tài khoản của bạn</h2>
          <p className="mt-2 text-sm text-gray-600">
            Bạn chưa có tài khoản?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Đăng ký tài khoản của bạn
            </Link>
          </p>
        </div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              className="w-full rounded-lg border-gray-300 shadow-sm placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              className="w-full rounded-lg border-gray-300 shadow-sm placeholder-gray-500 focus:ring-2 focus:ring-indigo-500"
              size="large"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-6">
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ span: 16 }}
            >
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Ghi nhớ tôi
                </label>
              </div>
            </Form.Item>

            <Link to="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={status === "loading"}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              size="large"
            >
              Đăng Nhập
            </Button>
          </Form.Item>

          {error && <div className="text-red-500 text-center">{`Error: ${error.message}`}</div>}
        </Form>
      </div>
    </div>
  );
};

export default Signin;
