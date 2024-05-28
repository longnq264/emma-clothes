import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";
import Footer from "../components/UI/Footer";
import classes from "./Root.module.css";
const RootLayout = () => {
  return (
    <div>
      <Header />
      <main className={classes.content}>
        <h1>Root Layout</h1>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
