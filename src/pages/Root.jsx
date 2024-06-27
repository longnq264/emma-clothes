import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
const RootLayout = () => {
  return (
    <div>
      <Header />
      <main className="min-h-screen mt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
