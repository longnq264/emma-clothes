import { Button, Form, Input, DatePicker, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authThunk";
import imgRegister from "../../assets/img/registerImage.jpg";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    // console.log(values);

    const formData = {
      ...values,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };
    // console.log(formData.date_of_birth);

    try {
      await dispatch(registerUser(formData));
      navigate("/");
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Thất bại:", errorInfo);
  };

  return (
    <div className=" mt-20">
      <div className="form flex justify-center">
        <div className="pl-10 pt-10 pb-10">
          <div className="bg-stone-800 relative flex justify-end">
            <img src={imgRegister} alt="" className="w-96 object-cover" />
          </div>
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg w-96">
          <h1 className="font-bold pb-6 text-4xl text-orange-500">Đăng ký</h1>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng!",
                },
              ]}
            >
              <Input placeholder="Tên người dùng" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Vui lòng nhập đúng định dạng email!",
                },
              ]}
            >
              <Input placeholder="Email của bạn" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
                {
                  min: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item
              name="re_password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại mật khẩu!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu" />
            </Form.Item>

            <Form.Item
              name="date_of_birth"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày sinh!",
                },
              ]}
              className="w-full"
            >
              <DatePicker className="w-full" placeholder="Ngày sinh" />
            </Form.Item>

            <Form.Item valuePropName="checked">
              <Checkbox>Nhớ tôi</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-orange-500"
              >
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
