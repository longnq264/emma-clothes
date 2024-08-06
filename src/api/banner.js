// import axios from "axios";

// const API_URL = "http://localhost:3000";

// export const getBanners = async () => {
//   const response = await axios.get(`${API_URL}/banners`);
//   return response.data;
// };

// export const addBanner = async (banner) => {
//   const response = await axios.post(`${API_URL}/banners`, banner, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return response.data;
// };

// export const updateBanner = async (id, banner) => {
//   const response = await axios.put(`${API_URL}/banners/${id}`, banner, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//   });
//   return response.data;
// };

// export const deleteBanner = async (id) => {
//   const response = await axios.delete(`${API_URL}/banners/${id}`);
//   return response.data;
// };
// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getBanners = () => api.get('/banners');
export const addBanner = (banner) => api.post('/banners', banner);
export const updateBanner = (id, banner) => api.put(`/banners/${id}`, banner);
export const deleteBanner = (id) => api.delete(`/banners/${id}`);
export default api;
