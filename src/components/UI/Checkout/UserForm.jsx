import { Form } from "antd";
import Payment from "../Payment";
import SelectShiping from "./SelectShiping";
import Address from "../Address/Address";
import PaymentIcon from "../Cart/PaymentIcon";
import { useSelector } from "react-redux";
import UserInput from "./UserInput";
import SubmitForm from "./SubmitForm";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

const UserForm = () => {
  const userData = useSelector((state) => state.auth.user);
  const { orderDetail } = useContext(AppContext);

  const onFinish = (values) => {
    console.log("Success:", values);
    console.log(orderDetail);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo.values);
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
          }}
          initialValues={{
            name: userData.name,
            phone_number: userData.phone_number,
            email: userData.email,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <UserInput />

          <Address />

          <SelectShiping />

          <Payment />

          <SubmitForm />
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
