import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/indexUtils";

const API_URL = "http://127.0.0.1:8000/api";

export const checking = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/cart/checking`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Kiểm tra nếu status là false và có unavailable_items
    const { status, message, unavailable_items } = response.data;

    if (status) {
      console.log("Kiểm tra giỏ hàng thành công:", response.data);
      return response.data;
    } else {
      // Nếu có sản phẩm không khả dụng, trả về thông tin chi tiết
      if (unavailable_items && unavailable_items.length > 0) {
        let unavailableMessage = "Các sản phẩm sau không có sẵn:\n";

        unavailable_items.forEach((item) => {
          unavailableMessage += `- Sản phẩm: ${item.product_name} (SKU: ${item.sku})\n`;
          unavailableMessage += `  Số lượng trong kho: ${item.stock}, Số lượng đặt hàng: ${item.ordered_quantity}\n`;
        });

        return {
          status: false,
          message: unavailableMessage,
        };
      }

      // Nếu không có sản phẩm không khả dụng, trả về lỗi thông thường
      return {
        status: false,
        message: message || "Có lỗi xảy ra khi kiểm tra giỏ hàng.",
      };
    }
  } catch (error) {
    console.error("Lỗi khi kiểm tra giỏ hàng:", error.response?.data || error.message);

    // Nếu lỗi xảy ra và có dữ liệu unavailable_items trong response
    const unavailable_items = error.response?.data?.unavailable_items;

    if (unavailable_items && unavailable_items.length > 0) {
      let unavailableMessage = "Các sản phẩm sau đang không hoạt động:\n";

      unavailable_items.forEach((item) => {
        unavailableMessage += `- Sản phẩm: ${item.product_name} - ${item.sku}\n`;
        unavailableMessage += `Vui lòng xóa các sản phẩm không hoạt động để tiếp tục mua hàng\n`;
        unavailableMessage += `Xin cám ơn!`;

        // unavailableMessage += `  Số lượng trong kho: ${item.stock}, Số lượng đặt hàng: ${item.ordered_quantity}\n`;
      });

      // Hiển thị thông báo chi tiết các sản phẩm không khả dụng
      alert(unavailableMessage);
    } else {
      // Nếu không có unavailable_items, hiển thị thông báo lỗi thông thường
      alert("Có lỗi xảy ra khi kiểm tra giỏ hàng.");
    }

    throw error;
  }
};