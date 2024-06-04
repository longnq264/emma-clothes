import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
// import Blogs from "./pages/Blog/Blogs.jsx";
import Contact from "./pages/Contact";
import RootLayout from "./pages/Root.jsx";
import NoPage from "./pages/Error.jsx";
import Signin from "./pages/Auth/Signin.jsx";
import Blogs from "./pages/Blog/Blogs.jsx";
import BlogDetail from "./pages/Blog/BlogDetail.jsx";
import ProductPage from "./pages/Product/ProductPage.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";

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
      { path: "/contact", element: <Contact /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <Signin /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

