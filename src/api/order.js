import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Hàm để lấy token từ localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || "";
};

// Hàm để tạo đơn hàng mới
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
    console.error("Lỗi khi tạo đơn hàng:", error);
    throw error;
  }
};

// Hàm để lấy tất cả các đơn hàng
export const fetchOrders = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && Array.isArray(response.data.data)) {
      console.log("Dữ liệu phản hồi từ API:", response.data);
      return response.data.data;
    } else {
      console.warn("API không trả về một mảng, trả về một mảng rỗng.");
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
    throw error;
  }
};

// Hàm để cập nhật trạng thái của một đơn hàng cụ thể
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
    console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    throw error;
  }
};

// Hàm để hủy một đơn hàng
export const cancelOrder = async (orderId) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(
      `${API_URL}/orders/${orderId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    throw error;
  }
};

// Hàm để lấy chi tiết của một đơn hàng cụ thể
export const fetchOrderDetails = async (orderId) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/orders/${orderId}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response:", response.data); // Kiểm tra toàn bộ phản hồi từ API

    if (response.data && response.data.data) {
      console.log("Chi tiết đơn hàng:", response.data.data);
      return response.data.data;
    } else {
      console.warn("Không tìm thấy chi tiết đơn hàng, trả về null.");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    throw error;
  }
};

// Hàm để lấy danh sách đơn hàng (list-order)
export const listOrder = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/list-order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data && Array.isArray(response.data.data)) {
      console.log("Danh sách đơn hàng từ API:", response.data);
      return response.data.data;
    } else {
      console.warn("API không trả về một mảng, trả về một mảng rỗng.");
      return [];
    }
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    throw error;
  }
};

