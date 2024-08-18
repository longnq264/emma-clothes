import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { getCities, getDistricts, getWards } from "../../../api/addressApi";
import { Select } from "antd";

const Address = () => {
  const { address, setAddress } = useContext(AppContext);
  const { Option } = Select;

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

  useEffect(() => {
    const fetchCities = async () => {
      const response = await getCities();
      console.log(response.data);
      const cities = response.data;

      setAddress((prevState) => ({ ...prevState, cities }));
    };
    fetchCities();
  }, [setAddress]);

  return (
    <div className="flex flex-col">
      <Select
        placeholder="Chọn Thành Phố"
        onChange={handleCityChange}
        value={address.selectedCity}
        className="w-full mb-2 h-10"
      >
        {address.cities.map((city) => (
          <Option key={city.id} value={city.id}>
            {city.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Chọn Quận Huyện"
        onChange={handleDistrictChange}
        value={address.selectedDistrict}
        className="w-full mb-2 h-10"
        disabled={!address.selectedCity}
      >
        {address.districts.map((district) => (
          <Option key={district.id} value={district.id}>
            {district.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder="Chọn Phường"
        onChange={handleWardChange}
        value={address.selectedWard}
        className="w-full mb-2 h-10"
        disabled={!address.selectedDistrict}
      >
        {address.wards.map((ward) => (
          <Option key={ward.id} value={ward.id}>
            {ward.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default Address;
