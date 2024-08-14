import axios from "axios";

const API_URL = "http://localhost:8000/api";
export const getBanners = async () => {
  const response = await axios.get(`${API_URL}/banners`);
  return response.data;
};

export const deleteBanner = async (id) => {
  const response = await axios.delete(`${API_URL}/banners/${id}`);
  return response.data;
};

export const updateBanner = async (id, data) => {
  const response = await axios.put(`${API_URL}/banners/${id}`, data);
  return response.data;
};

export const toggleBannerStatus = async (id) => {
  try {
      const response = await axios.put(`${API_URL}/banners/toggle/${id}`);
      return response.data;
  } catch (error) {
      console.error('Failed to toggle banner status:', error);
      throw error;
  }
};

export const updateBannerStatus = async (id, data) => {
  // console.log("Sending data:", data); // Add this to debug
  const response = await axios.put(`${API_URL}/banners/${id}`, data);
  // console.log("Response:", response.data); // Add this to see the response
  return response.data;
};

export const addBanner = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/banners`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to add banner:', error.response?.data || error.message);
    throw error;
  }
};