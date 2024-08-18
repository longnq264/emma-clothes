import { Button, Form, Input } from "antd";
import Payment from "../Payment";
import SelectShiping from "./SelectShiping";
import Address from "../Address/Address";
import PaymentIcon from "../Cart/PaymentIcon";
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
        <h2 className="text-xl font-bold pb-6">Người nhận</h2>
        <Form
          name="basic"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 30,
          }}
          style={{
            maxWidth: 800,
            // height: 40,
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
            <Input placeholder="Ten Khach Hang" className="py-2" />
          </Form.Item>

          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input placeholder="So Dien Thoai" className="py-2" />
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
            <Input placeholder="Email" className="py-2" />
          </Form.Item>

          <Address />

          <SelectShiping />

          <Payment />

          <Form.Item>
            <Button
              className="w-full bg-orange-400 hover:bg-orange-200 py-5 shadow-lg shadow-stone-400/40"
              type="primary"
              htmlType="submit"
            >
              <span className="font-bold text-base text-stone-700">
                Thanh toán bằng tiền mặt
              </span>
            </Button>
          </Form.Item>
        </Form>
        <div>
          <PaymentIcon />
          <p className="text-center text-xs pt-2">
            Đảm bảo thanh toán an toàn và bảo mật
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
