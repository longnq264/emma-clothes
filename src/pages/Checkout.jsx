// import { useContext, useState } from "react";

import Footer from "../components/UI/Checkout/Footer";
import Header from "../components/UI/Checkout/Header";
import UserForm from "../components/UI/Checkout/UserForm";
import OrderSummary from "../components/UI/Checkout/OrderSummary";

const Checkout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen">
        <div className="flex flex-col my-4">
          <h1 className="uppercase text-center font-bold text-3xl mt-4">
            Checkout
          </h1>
          <p className="text-center"></p>
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
