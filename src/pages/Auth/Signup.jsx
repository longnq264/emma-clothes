import { Button, Form, Input, DatePicker, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../store/authThunk";
import imgRegister from "../../assets/img/registerImage.jpg";
const Signup = () => {
  const navigate = useNavigate();

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
    <div className=" mt-20">
      <div className="form flex justify-center">
        <div className="pl-10 pt-10 pb-10">
          <div className="bg-stone-800 relative flex justify-end">
            <img src={imgRegister} alt="" className="w-96 object-cover" />
          </div>
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg w-96">
          <h1 className="font-bold pb-6 text-4xl text-orange-500">Register</h1>
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
                  message: "Please input your username!",
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
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Your Email" />
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
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              placeholder="Reset Password"
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
            <Form.Item name="date_of_birth" className="w-full">
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-orange-500"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
