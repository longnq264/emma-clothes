import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen mb-4 mt-20 lg:mt-40 lg:pt-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
