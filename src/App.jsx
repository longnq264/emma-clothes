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
import AboutPage from "./pages/About/AboutPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import NotLoggedIn from "./pages/NotLoggedIn.jsx";
import CollectionPage from "./pages/Collection/CollectionPage.jsx";
import CollectionDetailPage from "./pages/Collection/CollectionDetailPage.jsx";
import DashBoardPage from "./components/User/DashBoardPage.jsx";
import AdminLayout from "./components/User/AdminLayout.jsx";
import Sale from "./pages/Sale/Sale.jsx";
// import Products from "./pages/Admin/ProductsList.jsx";
import CategoriesList from "./components/User/Categories/CategoriesList.jsx";
import CategoriesAdd from "./components/User/Categories/CategoriesAdd.jsx";
import CategoriesEdit from "./components/User/Categories/CategoriesEdit.jsx";
import ProductAdd from "./pages/Admin/ProductAdd.jsx";
import ProductEdit from "./pages/Admin/ProductEdit.jsx";
import ProductsList from "./pages/Admin/ProductsList.jsx";
import AppProvider from "./context/AppProvider.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderPage from "./pages/Admin/Orders.jsx";
// import UsersPage from "./pages/Admin/Users.jsx";
import StaffList from "./pages/Admin/StaffList.jsx";
// import CustomersList from "./pages/Admin/CustomersList.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthLayout from "./components/Auth/Layout.jsx";
import LandingPage from "./components/UI/LandingPage.jsx";
import BannerList from "./components/User/Banner/BannerList.jsx";
import AddBanner from "./components/User/Banner/AddBanner.jsx";
import EditBanner from "./components/User/Banner/EditBanner.jsx";
import EditUser from "./components/User/Users/EditUser.jsx";
import UserList from "./components/User/Users/UserList.jsx";
import AddUser from "./components/User/Users/AddUser.jsx";
import AdminOrders from "./components/User/Order/ListOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NoPage />,
    // loader:
    children: [
      { path: "", element: <HomePage /> },
      { path: "/blog", element: <Blogs /> },
      { path: "/blog/:id", element: <BlogDetail /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
      //role collection
      { path: "/collection", element: <CollectionPage /> },
      { path: "/collection/:role", element: <CollectionDetailPage /> },
      //role categories
      { path: "/category/:id", element: <ProductPage /> },
      { path: "/products", element: <ProductPage /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/member", element: <LandingPage /> },
      { path: "/not-loggedin", element: <NotLoggedIn /> },
      { path: "/admin", element: <DashBoardPage /> },
      { path: "/sale", element: <Sale /> },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Signin /> },
      { path: "register", element: <Signup /> },
    ],
  },
  //role admin
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "", element: <DashBoardPage /> },
      { path: "order", element: <OrderPage /> },
      { path: "AdminOrders", element: <AdminOrders /> },
      { path: "products", element: <ProductsList /> },
      { path: "products/new", element: <ProductAdd /> },
      { path: "products/edit/:id", element: <ProductEdit /> },
      { path: "categories", element: <CategoriesList /> },
      { path: "categories/new", element: <CategoriesAdd /> },
      { path: "categories/edit/:id", element: <CategoriesEdit /> },
      { path: "staffs", element: <StaffList /> },
      // { path: "staffs/new", element: <StaffAdd /> }, // Sửa thành StaffAdd
      // { path: "staffs/edit/:id", element: <StaffEdit /> }, // Sửa thành StaffEdit
      { path: "users", element: <UserList /> },
      { path: "users/new", element: <AddUser /> },
      { path: "user/edit/:id", element: <EditUser /> },
      { path: "banners", element: <BannerList /> },
      { path: "banners/new", element: <AddBanner /> },
      { path: "banners/edit/:id", element: <EditBanner /> },
    ],
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  );
}

export default App;

