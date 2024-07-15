import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductId = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const getProductByCategoryId = async (id) => {
  const response = await axios.get(`${API_URL}/products?category_id=${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brands`);
  return response.data;
};

export const addToCart = async (data) => {
  const response = await axios.post(`${API_URL}/cart`, data);
  return response.data;
};

export const removeCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/${id}`);
  return response.data;
};

export const listCart = async () => {
  const response = await axios.get(`${API_URL}/cart`);
  return response.data;
};
