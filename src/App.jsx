import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import RootLayout from "./pages/Root.jsx";
import WebFont from "webfontloader";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/blog", element: <Blogs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blogs /> },
    ],
  },
]);

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Droid Sans", "Roboto", "Chilanka"],
      },
    });
  }, []);
  return <RouterProvider router={router} />;
}

export default App;

