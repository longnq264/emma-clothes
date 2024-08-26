// cartUtils.js

import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/indexUtils';

const API_URL = 'http://localhost:8000/api'; 

// Lấy danh sách người dùng
export const getUsers = async () => {
  try {
    const AUTH_TOKEN = `Bearer ${getTokenFromLocalStorage()}`;
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// Thêm người dùng mới
export const addUser = async (userData) => {
  try {
    const AUTH_TOKEN = `Bearer ${getTokenFromLocalStorage()}`;
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add user:', error);
    throw error;
  }
};

// Chỉnh sửa thông tin người dùng
export const updateUser = async (userId, userData) => {
  try {
    const AUTH_TOKEN = `Bearer ${getTokenFromLocalStorage()}`;
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: AUTH_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    const AUTH_TOKEN = `Bearer ${getTokenFromLocalStorage()}`;
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};

// Import users
export const importUsers = async (formData) => {
  try {
    const AUTH_TOKEN = `Bearer ${getTokenFromLocalStorage()}`;
    const response = await axios.post(`${API_URL}/users/import`, formData, {
      headers: {
        Authorization: AUTH_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to import users:', error);
    throw error;
  }
};
