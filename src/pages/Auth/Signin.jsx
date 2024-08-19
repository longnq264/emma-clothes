import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
        // Merge cartServer & cartLocal
        await dispatch(syncLocalCartToServer(token)).unwrap();

        // await dispatch(fetchCarts(token));
      }
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
      <div className="mt-10">
        <div className="flex flex-col justify-center">
          <div className="bg-gray-300 bg-opacity-20 w-96 container mx-auto p-10 rounded-lg shadow-2xl">
            <h1 className="font-bold text-center text-white text-3xl mb-10 ">
              Đăng Nhập
            </h1>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className=""
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
                className="mb-4 text-sm font-medium text-gray-700"
              >
                <Input
                  className="bg-white bg-opacity-20 border-none h-10"
                  placeholder="Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="bg-white bg-opacity-20 border-none h-10"
                />
              </Form.Item>
              <Form.Item className="">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={status === "loading"}
                  className="w-full bg-orange-400 bg-opacity-50 h-10"
                >
                  <p className="font-bold">Đăng Nhập</p>
                </Button>
                <p className="py-2 text-center">
                  <Link className="text-stone-700 ">Quên mật khẩu?</Link>
                </p>
              </Form.Item>
              {error && <div>Error</div>}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
