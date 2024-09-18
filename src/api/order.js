import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/indexUtils";
import { getTokenAdminFromLocalStorage } from "../utils/indexUtils";

const API_URL = "http://127.0.0.1:8000/api";

// Hàm tạo đơn hàng mới
export const addOrder = async (orderData) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(`${API_URL}/orders`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Đơn hàng đã được tạo:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy tất cả các đơn hàng
export const fetchOrders = async () => {
  const adminToken = getTokenAdminFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};


// Hàm cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, newStatus) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.put(
      `${API_URL}/update-status/${orderId}`,
      { status_id: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};

 

// Hàm lấy chi tiết đơn hàng
export const fetchOrderDetails = async (orderId) => {
  const token = getTokenAdminFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || null;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy danh sách đơn hàng
export const listOrder = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/list-order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy danh sách đơn hàng của người dùng
export const getUserOrders = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng của người dùng:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm hủy đơn hàng
export const cancelOrder = async (orderId) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `${API_URL}/orders/${orderId}/cancel`,  // Xác nhận endpoint đúng
      {}, // Nếu API yêu cầu body có thể cần bổ sung ở đây
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;  // Return success message
  } catch (error) {
    console.error("Error canceling order:", error.response?.data || error.message);
    throw error;  // Re-throw error để handle ở frontend
  }
};
