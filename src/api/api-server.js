// api-server.js
import axios from "axios";


const API_URL = "http://localhost:8000/api";

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const getUserId = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

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

export const filterProduct = async (action) => {
  const response = await axios.get(`${API_URL}/products?sort_by=${action}`);
  return response.data;
};
//---------------------------------- admin --------------------------------------

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${API_URL}/products/${productId}`);
  console.log(`Delete product ${productId} response:`, response.data);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/products`, productData);
  console.log("Create product response:", response.data);
  return response.data;
};

export const updateProduct = async (productId, productData) => {
  const response = await axios.put(
    `${API_URL}/products/${productId}`,
    productData
  );
  console.log(`Update product ${productId} response:`, response.data);
  return response.data;
};

export const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}`);
  console.log(`Get product ${productId} data:`, response.data);
  return response.data;
};
