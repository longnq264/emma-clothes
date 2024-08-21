import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

import { Form, Input, Select } from "antd";

const Address = () => {
  const { address, handleCityChange, handleDistrictChange, handleWardChange } =
    useContext(AppContext);
  const { Option } = Select;

  return (
    <div className="flex flex-col">
      <div className="wrap">
        <Form.Item name="city">
          <Select
            placeholder="Chọn Thành Phố"
            onChange={handleCityChange}
            value={address.selectedCityName}
            className="w-full mb-2 h-10"
          >
            {address.cities.map((city) => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="district">
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
        </Form.Item>
        <Form.Item name="ward">
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
        </Form.Item>
        <Form.Item name="address_detail">
          <Input type="text" placeholder="Địa chỉ cụ thể" className="h-10" />
        </Form.Item>
      </div>
    </div>
  );
};

export default Address;
