// import { useContext, useState } from "react";

// import Footer from "../components/UI/Checkout/Footer";
import Header from "../components/UI/Checkout/Header";
import UserForm from "../components/UI/Checkout/UserForm";
import OrderSummary from "../components/UI/Checkout/OrderSummary";

const Checkout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="flex flex-col-reverse md:flex-row justify-center">
          <div className=" md:basis-1/2 pt-8 mb-10">
            <UserForm />
          </div>
          <div className="md:basis-1/2 pt-8 md:border-l-2 border-gray-300">
            <OrderSummary />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Checkout;
