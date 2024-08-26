import PropTypes from "prop-types";
import { AppContext } from "./AppContext.jsx";
import { useEffect, useState } from "react";
import { getCities, getDistricts, getWards } from "../api/addressApi.js";
import { checkout } from "../api/api-server.js";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice.js";

import { DarkModeProvider } from "../components/User/DarkModeProvider.jsx"; 

import { fetchCarts } from "../store/cartThunk.js";


const AppProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [currentSelect, setCurrentSelect] = useState("city");
  const [address, setAddress] = useState({
    cities: [],
    districts: [],
    wards: [],
    selectedCity: null,
    selectedCityName: "",
    selectedDistrict: null,
    selectedDistrictName: "",
    selectedWard: null,
    selectedWardName: "",
  });
  const [orderDetail, setOrderDetail] = useState({
    shipping_method: "Tiêu chuẩn",
    ward: "",
    district: "",
    city: "",
    address_detail: "",
    name: "",
    phone_number: "",
    email: "",
  });

  // Address
  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities();
      const cities = response.data;

      setAddress((prevState) => ({ ...prevState, cities }));
    };

    fetchCities();
  }, [setAddress]);

  // Detail Order
  useEffect(() => {
    setOrderDetail((prevOrderDetail) => ({
      ...prevOrderDetail,
      ward: address.selectedWardName,
      district: address.selectedDistrictName,
      city: address.selectedCityName,
    }));
  }, [address]);

  const handleCityChange = async (cityId) => {
    const selectedCity = address.cities.find((city) => city.id === cityId);
    const response = await getDistricts(cityId);
    const districts = response.data;
    console.log(selectedCity);

    setAddress((prevState) => ({
      ...prevState,
      selectedCity: cityId,
      selectedCityName: selectedCity.name,
      districts,
      wards: [],
      selectedDistrict: null,
      selectedWard: null,
    }));
  };

  const handleDistrictChange = async (districtId) => {
    const selectedDistrict = address.districts.find(
      (district) => district.id === districtId
    );
    console.log(selectedDistrict);

    const response = await getWards(districtId);

    const wards = response.data;
    setAddress((prevState) => ({
      ...prevState,
      selectedDistrict: districtId,
      selectedDistrictName: selectedDistrict.name,
      wards,
      selectedWard: null,
    }));
  };

  const handleWardChange = (wardId) => {
    const selectedWard = address.wards.find((ward) => ward.id === wardId);
    console.log(selectedWard);

    if (selectedWard) {
      setAddress((prevState) => ({
        ...prevState,
        selectedWardName: selectedWard.name,
      }));
    }
  };

  // if true
  const handleCheckoutSuccess = async () => {
    try {
      // Sucss order
      notification.success({
        message: "Thanh toán thành công",
        description:
          "Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.",
      });

      // Cập nhật giỏ hàng
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
      dispatch(fetchCarts());
      // Gửi email xác nhận (optional)
      // await sendConfirmationEmail(orderDetail);

      // Ghi nhận hành vi của người dùng (analytics)
      // analytics.track('Checkout Success', {
      //   orderId: orderDetail.id,
      //   amount: orderDetail.total,
      // });

      // Cập nhật trạng thái đơn hàng trong hệ thống
      // await updateOrderStatus(orderDetail.id, 'Processing');
    } catch (error) {
      console.error("Checkout success handling failed", error);
    }
  };
  // handle checkout
  const handleCheckoutDetail = async (data, token) => {
    try {
      const response = await checkout(data, token);
      // handleCheckoutSuccess();
      if (response.url) {
        window.location.href = response.url;
      }
      if (response.message === "Order has been placed successfully") {
        window.location.href = "/checkout-done";
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (type) => {
    console.log("type", type);

    setCurrentSelect(type);
  };

  return (
    <DarkModeProvider> {/* Bao bọc bằng DarkModeProvider */}
    <AppContext.Provider
      value={{
        address,
        setAddress,
        currentSelect,
        handleCityChange,
        handleDistrictChange,
        handleWardChange,
        handleButtonClick,
        handleCheckoutDetail,
        orderDetail,
        setOrderDetail,
      }}
    >
      {children}
    </AppContext.Provider>
    </DarkModeProvider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
