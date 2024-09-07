import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/indexUtils";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getTokenFromLocalStorage()}`,
    "Content-Type": "application/json",
  },
});

// Lấy tất cả thuộc tính
export const fetchAttributes = async () => {
  try {
    const response = await api.get("/attributes");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thuộc tính:", error);
    throw error;
  }
};

// Thêm thuộc tính mới
export const createAttribute = async (attributeData) => {
  try {
    const response = await api.post("/attributes", attributeData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm thuộc tính:", error);
    throw error;
  }
};

// Thêm thuộc tính mới
export const addAttribute = async (attributeData) => {
  try {
    const response = await api.post("/attributes", attributeData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm thuộc tính:", error);
    throw error;
  }
};

// Cập nhật thuộc tính
export const updateAttribute = async (id, attributeData) => {
  try {
    const response = await api.put(`/attributes/${id}`, attributeData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thuộc tính:", error);
    throw error;
  }
};

// Xóa thuộc tính
export const deleteAttribute = async (id) => {
  try {
    const response = await api.delete(`/attributes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa thuộc tính:", error);
    throw error;
  }
};

// Xóa giá trị của thuộc tính cụ thể
export const deleteAttributeValue = async (attributeId, valueId) => {
  try {
    const response = await api.delete(
      `/attributes/${attributeId}/values/${valueId}`
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa giá trị thuộc tính:", error);
    throw error;
  }
};

// Khôi phục giá trị thuộc tính đã xóa
export const restoreAttributeValue = async (attributeId, valueId) => {
  try {
    const response = await api.patch(
      `/attributes/${attributeId}/values/${valueId}/restore`
    );
    return response.data;
  } catch (error) {
    console.error("Lỗi khi khôi phục giá trị thuộc tính:", error);
    throw error;
  }
};

// http://127.0.0.1:8000/api/products?attribute[1][]=1&attribute[2][]=10&attribute[3][]=16

export const filterAtrributes = async (attributes) => {
  try {
    const response = await api.get(`products?${attributes}`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật thuộc tính:", error);
    throw error;
  }
};

