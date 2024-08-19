import axios from "axios";

const API_BASE_URL = "https://esgoo.net/api-tinhthanh";

export const getCities = async () => {
  const response = await axios.get(`${API_BASE_URL}/1/0.htm`);

  return response.data;
};

export const getDistricts = async (cityId) => {
  const response = await axios.get(`${API_BASE_URL}/2/${cityId}.htm`);
  console.log(response.data);

  return response.data;
};

export const getWards = async (districtId) => {
  const response = await axios.get(`${API_BASE_URL}/3/${districtId}.htm`);
  console.log(response.data);

  return response.data;
};
