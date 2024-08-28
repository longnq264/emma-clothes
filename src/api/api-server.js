// api-server.js
import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:8000/api";

export const getBanners = async () => {
  const response = await axios.get(`${API_URL}/banners`);
  return response.data;
};

export const searchKey = async (key) => {
  const response = await axios.get(`${API_URL}/products?search=${key}`);
  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

// Hàm đăng nhập người dùng
export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    // Xử lý lỗi khi đăng nhập thất bại
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    throw error; // ném lỗi ra ngoài để xử láy hàm taị chỗ
  }
};

// export const getUserId = async (token) => {
//   const response = await axios.get(`${API_URL}/user`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

export const getUserId = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get user ID:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
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

////////////////////////// cart
export const addToCart = async (data, token) => {
  const response = await axios.post(`${API_URL}/cart/add`, qs.stringify(data), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateCart = async (id, token, quantity) => {
  const response = await axios.put(`${API_URL}/cart/${id}`, quantity, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const removeCart = async (id, token) => {
  const response = await axios.delete(`http://127.0.0.1:8000/api/cart/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const clearCart = async (token) => {
  try {
    const response = await axios.delete(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const listCart = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("list-cart", response);

    return response.data;
  } catch (error) {
    console.log(error);
  }
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

// export const createProduct = async (productData) => {
//   const response = await axios.post(`${API_URL}/products`, productData);
//   console.log("Create product response:", response.data);
//   return response.data;
// };

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/products`, productData);
    console.log("Create product response:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Error creating product:", error);
    }
    throw error;
  }
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

// export const getProduct = async () => {
//   const response = await axios.get(`${API_URL}/products?include=categories`);
//   console.log("API response data:", response.data); // Kiểm tra dữ liệu trả về từ API
//   return response.data;
// };

export const getProductsByPriceRange = async (minPrice, maxPrice) => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/products?min_price=${minPrice}&max_price=${maxPrice}`
  );
  return response.data;
};

export const getAttributes = async () => {
  const response = await axios.get(`${API_URL}/attributes`);
  return response.data;
};

// export const createAttributes = async () => {
//   const response = await axios.get(`${API_URL}/attributes`);
//   return response.data;
// };

// phần admin Categories

// Category APIs

export const createCategory = async (categoryData) => {
  const response = await axios.post(`${API_URL}/categories`, categoryData);
  console.log("Create category response:", response.data);
  return response.data;
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await axios.put(
      `${API_URL}/categories/${categoryId}`,
      categoryData
    );
    console.log(`Cập nhật danh mục ${categoryId} thành công:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật danh mục ${categoryId}:`, error.message);
    throw error;
  }
};

export const getCategory = async (categoryId) => {
  const response = await axios.get(`${API_URL}/categories/${categoryId}`);
  return response.data;
};

export const deleteCategory = async (categoryId) => {
  const response = await axios.delete(`${API_URL}/categories/${categoryId}`);
  console.log(`Delete category ${categoryId} response:`, response.data);
  return response.data;
};

// phần admin users

// Lấy danh sách người dùng
export const getUsers = async (params = {}) => {
  try {
    const response = await axios.get(`${API_URL}/users`, { params });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch users:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Thêm người dùng mới
export const addUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to add user:", error);
    throw error;
  }
};

// Chỉnh sửa thông tin người dùng
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
};

// Import users
export const importUsers = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/users/import`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to import users:", error);
    throw error;
  }
};

export const getListAddress = async () => {
  const response = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
  console.log(`Get address data`, response.data);
  return response.data;
};

export const checkout = async (data, token) => {
  console.log("data checkout", data);

  const response = await axios.post(`${API_URL}/cart/checkout`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Lấy danh sách đơn hàng của người dùng
// Hàm lấy danh sách đơn hàng của người dùng
export const getUserOrders = async (token) => {
  try {
    const { data } = await axios.get(`${API_URL}/list-order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    handleOrderError(error);
    throw error; // Ném lỗi để xử lý ở nơi gọi hàm
  }
};

// Hàm xử lý lỗi khi lấy đơn hàng
const handleOrderError = (error) => {
  if (error.response) {
    console.error(`Lỗi ${error.response.status}:`, error.response.data);
    if (error.response.status === 401) {
      console.error("Không có quyền truy cập: Kiểm tra lại token.");
      // Thực hiện hành động khác nếu cần (refresh token hoặc chuyển hướng)
    }
  } else if (error.request) {
    console.error("Không nhận được phản hồi từ server:", error.request);
  } else {
    console.error("Lỗi:", error.message);
  }
};

// Lấy danh sách tất cả các đơn hàng (có thể dùng cho Admin)
export const listOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/list-order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw error;
  }
};


export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    console.log("Get dashboard data:", response.data);
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi và phản hồi từ API
    console.error("Error fetching dashboard data:", error.response ? error.response.data : error.message);
    throw error;
  }
};



// lọc sản phẩm
export const filterProducts = async (filters) => {
  try {
    const queryString = qs.stringify(filters, { arrayFormat: "repeat" });
    const response = await axios.get(`${API_URL}/products?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Failed to filter products:", error.message);
    throw error;
  }
};

