import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';
const AUTH_TOKEN = 'Bearer 28|EqKaELX2fVXOrXquaiFqzcvZVkkeaxOGfe8yKlgGd86d7c8a';

// Hàm để lấy tất cả các đơn hàng
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    if (response.data && Array.isArray(response.data.data)) {
      console.log('Dữ liệu phản hồi từ API:', response.data);
      return response.data.data;
    } else {
      console.warn('API không trả về một mảng, trả về một mảng rỗng.');
      return [];
    }
  } catch (error) {
    console.error('Lỗi khi lấy đơn hàng:', error);
    throw error;
  }
};

// Hàm để cập nhật trạng thái của một đơn hàng cụ thể
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.put(
      `${API_URL}/order/${orderId}/status`,
      { status_id: newStatus },
      {
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    throw error;
  }
};

// Hàm để lấy chi tiết của một đơn hàng cụ thể
export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/order/${orderId}`, {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    console.log('API response:', response.data); // Kiểm tra toàn bộ phản hồi từ API

    if (response.data && response.data.data) {
      console.log('Chi tiết đơn hàng:', response.data.data);
      return response.data.data;
    } else {
      console.warn('Không tìm thấy chi tiết đơn hàng, trả về null.');
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
    throw error;
  }
};