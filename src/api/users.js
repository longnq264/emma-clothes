import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your actual API URL
const TOKEN = 'Bearer 42|DVFmdovRTeRikmCi5vTaFp63S7pM6GP3G6eBcyWff649ee57'; // Your token

// Lấy danh sách người dùng
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: TOKEN,
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
    const response = await axios.post(`${API_URL}/users`, userData, {
      headers: {
        Authorization: TOKEN,
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
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
      headers: {
        Authorization: TOKEN,
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
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: TOKEN,
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
    const response = await axios.post(`${API_URL}/users/import`, formData, {
      headers: {
        Authorization: TOKEN,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to import users:', error);
    throw error;
  }
};
