import { Form } from "antd";
import Payment from "../Payment";
import SelectShiping from "./SelectShiping";
import Address from "../Address/Address";
import PaymentIcon from "../Cart/PaymentIcon";
import { useSelector } from "react-redux";
import UserInput from "./UserInput";
import SubmitForm from "./SubmitForm";
import { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserForm = () => {
  const userData = useSelector((state) => state.auth.user);
  const { orderDetail, setOrderDetail, handleCheckoutDetail } =
    useContext(AppContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      payment: values.payment,
      address_detail: values.address_detail,
      email: values.email,
      phone_number: Number(values.phone_number),
      name: values.name,
    }));
    console.log(orderDetail);
    setFormSubmitted(true);
  };
  useEffect(() => {
    if (formSubmitted) {
      const handleSubmitCheckout = async () => {
        try {
          console.log(token);

          await handleCheckoutDetail(orderDetail, token);

          console.log("Request sent successfully");
        } catch (error) {
          console.error("Request failed", error);
        }
      };
      handleSubmitCheckout();
    }
  }, [orderDetail, formSubmitted, handleCheckoutDetail, navigate, token]);

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo.values);
  };

  return (
    <div className="user-form md:flex justify-end w-full">
      <div className="md:size-3/5 px-6 md:pr-14 md:min-w-96">
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
          initialValues={
            token
              ? {
                  name: userData.name || "",
                  phone_number: userData.phone_number,
                  email: userData.email,
                }
              : ""
          }
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
