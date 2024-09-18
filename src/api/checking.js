import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/indexUtils";

const API_URL = "http://127.0.0.1:8000/api";

export const checking = async (checkingData) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(`${API_URL}/cart/checking`, checkingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Kiểm tra nếu status là false và có unavailable_items
    const { status, message, unavailable_items } = response.data;
    
    if (status) {
      console.log("Đơn hàng đã được tạo thành công:", response.data);
      return response.data;
    } else {
      // Nếu có sản phẩm không có sẵn, trả về thông tin chi tiết
      if (unavailable_items && unavailable_items.length > 0) {
        let unavailableMessage = "Các sản phẩm sau không có sẵn:\n";
        
        unavailable_items.forEach(item => {
          unavailableMessage += `- Sản phẩm: ${item.product_name} (SKU: ${item.sku})\n`;
          unavailableMessage += `  Số lượng trong kho: ${item.stock}, Số lượng đặt hàng: ${item.ordered_quantity}\n`;
        });

        return {
          status: false,
          message: unavailableMessage,
        };
      }

      // Nếu không có sản phẩm không có sẵn, trả về lỗi thông thường
      return {
        status: false,
        message: message || "Có lỗi xảy ra khi tạo đơn hàng.",
      };
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra đơn hàng:", error.response?.data || error.message);
    throw error;
  }
};
