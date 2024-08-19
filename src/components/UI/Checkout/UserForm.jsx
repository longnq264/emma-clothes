import { Form } from "antd";
import Payment from "../Payment";
import SelectShiping from "./SelectShiping";
import Address from "../Address/Address";
import PaymentIcon from "../Cart/PaymentIcon";
import { useSelector } from "react-redux";
import UserInput from "./UserInput";
import SubmitForm from "./SubmitForm";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const userData = useSelector((state) => state.auth.user);
  const { orderDetail, setOrderDetail, handleCheckoutDetail } =
    useContext(AppContext);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const submitRef = useRef(false);

  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();
  useEffect(() => {
    if (formSubmitted && submitRef.current) {
      (async () => {
        try {
          await handleCheckoutDetail(orderDetail, token);
          console.log("Request sent successfully");
          // Reset submitRef để tránh gửi lại request không cần thiết
          submitRef.current = false;
        } catch (error) {
          console.error("Request failed", error);
        }
      })();
    }
  }, [orderDetail, formSubmitted, token]);

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
    setFormSubmitted(true);
    submitRef.current = true;
    console.log("orderDetail", orderDetail);
    navigate("/products");
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
