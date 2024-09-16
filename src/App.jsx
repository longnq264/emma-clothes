import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
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
import Sale from "./pages/Sale/Sale.jsx";
import CategoriesList from "./components/User/Categories/CategoriesList.jsx";
import CategoriesAdd from "./components/User/Categories/CategoriesAdd.jsx";
import CategoriesEdit from "./components/User/Categories/CategoriesEdit.jsx";
import ProductAdd from "./pages/Admin/ProductAdd.jsx";
import ProductEdit from "./pages/Admin/ProductEdit.jsx";
import ProductsList from "./pages/Admin/ProductsList.jsx";
import AppProvider from "./context/AppProvider.jsx";
import Checkout from "./pages/Checkout.jsx";
import store from "./store/store.js";
import LoginAdmin from "./pages/Auth/signinAdmin.jsx";
import AuthLayout from "./components/Auth/Layout.jsx";
import LandingPage from "./components/UI/LandingPage.jsx";
import PrivacyPage from "./pages/Privacy/PrivacyPage.jsx";
import TermsPage from "./pages/Term/TermsPage.jsx";
import OverviewDashboard from "./pages/Admin/Dashboard/OverviewDashboard.jsx";
import BannerList from "./components/User/Banner/BannerList.jsx";
import AddBanner from "./components/User/Banner/AddBanner.jsx";
import EditBanner from "./components/User/Banner/EditBanner.jsx";
import EditUser from "./components/User/Users/EditUser.jsx";
import UserList from "./components/User/Users/UserList.jsx";
import AddUser from "./components/User/Users/AddUser.jsx";
import OrderDetails from "./components/User/Order/OrderDetails.jsx";
import ListOrder from "./components/User/Order/ListOrder.jsx";
// import AddOrders from "./components/User/Order/Addorder.jsx";
import Thanks from "./pages/Thanks.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import GetData from "./pages/Auth/GetData.jsx";
import AttributeList from "./components/User/Attributes/AttributeList.jsx";
import EditAttribute from "./components/User/Attributes/EditAttribute.jsx";
import AddAttribute from "./components/User/Attributes/AddAttribute.jsx";
import ProfileAdmin from "./pages/Admin/ProfileAdmin.jsx";
import ProductListDetail from "./pages/Admin/ProductListDetail.jsx";

import CouponList from "./components/User/Coupon/CouponList.jsx";
import CouponAdd from "./components/User/Coupon/CouponAdd.jsx";
import CouponDetail from "./components/User/Coupon/CouponDetail.jsx";
import CouponEdit from "./components/User/Coupon/CouponEdit.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";

function App() {
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
        { path: "/privacy", element: <PrivacyPage /> },
        { path: "/terms", element: <TermsPage /> },
        { path: "/collection", element: <CollectionPage /> },
        { path: "/collection/:role", element: <CollectionDetailPage /> },
        { path: "/category/:id", element: <ProductPage /> },
        { path: "/products", element: <ProductPage /> },
        { path: "/products/:id", element: <ProductDetail /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/member", element: <LandingPage /> },
        { path: "/not-loggedin", element: <NotLoggedIn /> },
        { path: "/checkout-done", element: <Thanks /> },
        { path: "/admin", element: <DashBoardPage /> },
        { path: "/sale", element: <Sale /> },
        { path: "/resetPassword/:data", element: <GetData /> },
      ],
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Signin /> },
        { path: "register", element: <Signup /> },
        { path: "loginAdmin", element: <LoginAdmin /> },
        { path: "send-mail", element: <ForgotPassword /> },
        { path: "resetPassword/:token/:email", element: <ResetPassword /> },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedRoute />,

      children: [
        { path: "", element: <DashBoardPage /> },
        { path: "profile", element: <ProfileAdmin /> },
        { path: "orders", element: <ListOrder /> },
        // { path: "orders/new", element: <AddOrders /> },
        { path: "orders/:orderId", element: <OrderDetails /> },
        { path: "products", element: <ProductsList /> },
        { path: "products/new", element: <ProductAdd /> },
        { path: "products/edit/:id", element: <ProductEdit /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "categories/new", element: <CategoriesAdd /> },
        { path: "categories/edit/:id", element: <CategoriesEdit /> },
        { path: "overview", element: <OverviewDashboard /> },
        { path: "users", element: <UserList /> },
        { path: "users/new", element: <AddUser /> },
        { path: "user/edit/:id", element: <EditUser /> },
        { path: "banners", element: <BannerList /> },
        { path: "banners/new", element: <AddBanner /> },
        { path: "banners/edit/:id", element: <EditBanner /> },
        { path: "attributes", element: <AttributeList /> },
        { path: "attributes/edit/:id", element: <EditAttribute /> },
        { path: "attributes/new", element: <AddAttribute /> },
        { path: "products/:id", element: <ProductListDetail /> },

        { path: "coupons", element: <CouponList /> },
        { path: "coupons/new", element: <CouponAdd /> },
        { path: "coupons/edit/:id", element: <CouponEdit /> },
        { path: "coupons/:id", element: <CouponDetail /> },
      ],
    },
    {
      path: "checkout",
      element: <Checkout />,
    },
  ]);

  return (
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  );
}

export default App;
