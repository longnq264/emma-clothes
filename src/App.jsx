import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import RootLayout from "./pages/Root.jsx";
import NoPage from "./pages/Error.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NoPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/blog", element: <Blogs /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blogs /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

