import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import RootLayout from "./pages/Root.jsx";
import NoPage from "./pages/Error.jsx";
import Signin from "./pages/Auth/Signin.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import Blogs from "./pages/Blog/Blogs.jsx";
import BlogDetail from "./pages/Blog/BlogDetail.jsx";
import ProductPage from "./pages/Product/ProductPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import ProductDetail from "./pages/Product/ProductDetail.jsx";
import ContactPage from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NoPage />,
    // loader:
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/blog", element: <Blogs /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      { path: "/contact", element: <ContactPage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <Signin /> },
      { path: "/register", element: <Signup /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

