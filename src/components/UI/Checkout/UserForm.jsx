import { Button, Form, Input } from "antd";
import City from "../Address/City";
import Payment from "../Payment";

const UserForm = () => {
  //   const [formData, setFormData] = useState({
  //     name: "",
  //     email: "",
  //     address: "",
  //     city: "",
  //     postalCode: "",
  //   });

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="user-form flex justify-end">
      <div className="size-2/4">
        <h2 className="text-xl font-bold pb-6">Người Nhận</h2>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 30,
          }}
          style={{
            maxWidth: 800,
          }}
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
            <Input placeholder="Ten Khach Hang" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="So Dien Thoai" />
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
            <Input placeholder="Email" />
          </Form.Item>

          <City />

          <Payment />

          <Form.Item>
            <Button
              className="w-full bg-orange-400 font-bold text-base hover:bg-orange-200 py-5"
              type="primary"
              htmlType="submit"
            >
              Thanh toán bằng tiền mặt
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserForm;
