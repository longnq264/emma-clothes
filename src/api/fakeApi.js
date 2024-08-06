import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductId = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brands`);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
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

// // Lấy danh sách người dùng
// export const getUsers = async () => {
//   try {
//     const response = await axios.get(`http://localhost:3000/api//users`);
//     if (response && response.data) {
//       return response.data;
//     } else {
//       throw new Error('No data in response');
//     }
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//     throw error;
//   }
// };

// // Thêm người dùng mới
// export const addUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to add user:", error);
//     throw error;
//   }
// };

// // Chỉnh sửa thông tin người dùng
// export const updateUser = async (userId, userData) => {
//   try {
//     const response = await axios.put(`${API_URL}/users/${userId}`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to update user:", error);
//     throw error;
//   }
// };

// // Xóa người dùng
// export const deleteUser = async (userId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete user:", error);
//     throw error;
//   }
// };

// // Import users
// export const importUsers = async (formData) => {
//   try {
//     const response = await axios.post(`${API_URL}/users/import`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to import users:", error);
//     throw error;
//   }
// };
