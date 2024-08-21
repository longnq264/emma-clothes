// import { useContext, useState } from "react";

import Footer from "../components/UI/Checkout/Footer";
import Header from "../components/UI/Checkout/Header";
import UserForm from "../components/UI/Checkout/UserForm";
import OrderSummary from "../components/UI/Checkout/OrderSummary";

const Checkout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="flex justify-center h-full">
          <div className="justify-end mt-8 basis-1/2 pr-14 mb-10">
            <UserForm />
          </div>
          <div className="bg-slate-50 justify-start basis-1/2 pl-14 pt-8 border-l-2 border-gray-300">
            <OrderSummary />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
