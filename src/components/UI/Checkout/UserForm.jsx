import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getTokenFromLocalStorage } from "../../../utils/indexUtils";
import Payment from "../Payment";
import SelectShiping from "./SelectShiping";
import Address from "../Address/Address";
import PaymentIcon from "../Cart/PaymentIcon";
import UserInput from "./UserInput";
import SubmitForm from "./SubmitForm";
import { clearCart } from "../../../store/cartSlice";
// import { clearCart } from "../../../store/cartSlice";

const UserForm = () => {
  const navigate = useNavigate();
  const token = getTokenFromLocalStorage();
  const { orderDetail, setOrderDetail, handleCheckoutDetail } =
    useContext(AppContext);
  const userData = useSelector((state) => state.auth.user);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [payment, setPayment] = useState("COD");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      payment: payment,
      address_detail: values.address_detail,
      email: values.email,
      phone_number: Number(values.phone_number),
      name: values.name,
    }));
    // console.log(orderDetail);
    setFormSubmitted(true);
  };

  useEffect(() => {
    if (formSubmitted) {
      const handleSubmitCheckout = async () => {
        try {
          await handleCheckoutDetail(orderDetail, token);
          localStorage.removeItem("cartItems");
          dispatch(clearCart());
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

          <Payment setPayment={setPayment} payment={payment} />

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
