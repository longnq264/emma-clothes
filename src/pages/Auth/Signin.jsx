import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../store/authThunk";
import {
  getCartFromLocalStorage,
  getTokenFromLocalStorage,
} from "../../utils/indexUtils";
import { fetchCarts, syncLocalCartToServer } from "../../store/cartThunk";
import imglogin from "../../assets/img/mountain.jpg";

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
      const token = getTokenFromLocalStorage();
      // console.log(merged);
      const cartItem = getCartFromLocalStorage();
      if (cartItem.length > 0) {
        await dispatch(syncLocalCartToServer(token)).unwrap();
      }
      await dispatch(fetchCarts(token));
      navigate("/");
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Thất bại:", errorInfo);
  };

  return (
    <>
      <div className="mt-20">
        <div className="container mx-auto">
          <div className="wrap-content flex justify-center">
            <div className="bg-white bg-opacity-30 w-1/2 relative rounded-l-lg shadow-2xl">
              <img
                src={imglogin}
                alt=""
                className="opacity-80 object-center h-full rounded-l-lg"
              />
              <div className="absolute bottom-20 left-16">
                <h1 className="text-site-title text-7xl font-bold text-white mb-6">
                  Chào mừng!
                </h1>
                <p className="text-slate-100 opacity-70 w-2/3 font-bold">
                  Chào mừng bạn đến với Emma! Hãy đăng nhập để khám phá những ưu
                  đãi đặc biệt và trải nghiệm mua sắm tuyệt vời cùng chúng tôi.
                  Nếu bạn chưa có tài khoản, đừng ngần ngại tạo một tài khoản
                  mới để tham gia cộng đồng của chúng tôi.
                </p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 w-96 p-10 rounded-r-lg shadow-2xl">
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
                      type: "email",
                      message: "Vui lòng nhập đúng định dạng email!",
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
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Mật khẩu"
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
                    <Link to="/auth/send-mail" className="text-stone-700 ">
                      Quên mật khẩu?
                    </Link>
                  </p>
                </Form.Item>
                {error && (
                  <div className="text-red-500">
                    Đăng nhập thất bại. Vui lòng thử lại!
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
