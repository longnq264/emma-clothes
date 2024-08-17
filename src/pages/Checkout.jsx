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
            Thanh Toán
          </h1>
          <p className="text-center"></p>
        </div>
        <div className="flex justify-center h-full">
          <div className="justify-end pl-10 pt-6 basis-1/2 pr-14">
            <UserForm />
          </div>
          <div className="bg-slate-50 justify-start basis-1/2 pl-10 pt-6 border-l-2 border-gray-300">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
