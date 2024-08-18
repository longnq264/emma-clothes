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
    selectedDistrict: null,
    selectedWard: null,
    addressString: "",
  });
  console.log(address);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities();
      console.log(response.data);
      const cities = response.data;

      setAddress((prevState) => ({ ...prevState, cities }));
    };
    fetchCities();
  }, []);
  console.log(address.cities);

  const handleCityChange = async (cityId) => {
    const response = await getDistricts(cityId);
    const districts = response.data;
    setAddress((prevState) => ({
      ...prevState,
      selectedCity: cityId,
      districts,
      wards: [],
      selectedDistrict: null,
      selectedWard: null,
    }));
  };

  const handleDistrictChange = async (districtId) => {
    const response = await getWards(districtId);
    const wards = response.data;
    setAddress((prevState) => ({
      ...prevState,
      selectedDistrict: districtId,
      wards,
      selectedWard: null,
    }));
  };

  const handleWardChange = (wardId) => {
    setAddress((prevState) => ({
      ...prevState,
      selectedWard: wardId,
    }));
  };

  const handleButtonClick = (type) => {
    setCurrentSelect(type);
  };

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
