// import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Footer from "../components/UI/Checkout/Footer";
import Header from "../components/UI/Checkout/Header";
import { useContext } from "react";
import UserForm from "../components/UI/Checkout/UserForm";
import OrderSummary from "../components/UI/Checkout/OrderSummary";

const Checkout = () => {
  const { selectedItems, totalPrice } = useContext(AppContext);
  console.log(totalPrice, selectedItems);

  //   const [customerInfo, setCustomerInfo] = useState({
  //     name: "",
  //     address: "",
  //     phone: "",
  //     email: "",
  //   });

  //   const [paymentMethod, setPaymentMethod] = useState("credit_card");
  //   const [orderStatus, setOrderStatus] = useState(null);

  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const orderData = {
  //       customerInfo,
  //       paymentMethod,
  //       items,
  //       totalPrice,
  //       userId: user ? user.id : null,
  //     };

  //     try {
  //       const response = await placeOrder(orderData);
  //       setOrderStatus('success');
  //       // Xóa giỏ hàng nếu cần
  //     } catch (error) {
  //       setOrderStatus('error');
  //     }
  //   };

  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="flex flex-col my-4">
          <h1 className="uppercase text-center font-bold text-3xl mt-4">
            Checkout
          </h1>
          <p className="text-center">
            {`($ item)`} <span>{totalPrice}</span>
          </p>
        </div>
        <div className="container mx-auto flex">
          <div className="left-col basis-1/2">
            <UserForm />
          </div>
          <div className="right-col basis-1/2">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
