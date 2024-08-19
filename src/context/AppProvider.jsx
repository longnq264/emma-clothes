import { AppContext } from "./AppContext.jsx";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCities, getDistricts, getWards } from "../api/addressApi.js";

const AppProvider = ({ children }) => {
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
    addressString: "",
  });
  const [orderDetail, setOrderDetail] = useState({
    shipping_method: "Tiêu chuẩn",
    address_detail: "Nhà văn hóa",
    ward: "",
    district: "",
    city: "",
  });

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities();
      const cities = response.data;

      setAddress((prevState) => ({ ...prevState, cities }));
    };

    fetchCities();
  }, [setAddress]);

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

  const handleButtonClick = (type) => {
    setCurrentSelect(type);
  };
  // const updtaeOrderDetail = () => {
  //   setOrderDetail({});
  // };
  return (
    <AppContext.Provider
      value={{
        address,
        setAddress,
        currentSelect,
        handleCityChange,
        handleDistrictChange,
        handleWardChange,
        handleButtonClick,
        orderDetail,
        setOrderDetail,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any,
};

export default AppProvider;
