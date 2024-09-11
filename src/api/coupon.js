import axios from "axios";
import { getTokenFromLocalStorage } from "../utils/indexUtils";

const API_URL = "http://127.0.0.1:8000/api/coupon";

// Hàm lấy danh sách coupon
export const listCoupons = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/list-coupon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách coupon:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllCoupons = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/list-coupon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách coupon:', error.response?.data || error.message);
    throw error;
  }
};
// Hàm thêm coupon
export const addCoupon = async (couponData) => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axios.post(`${API_URL}/add`, couponData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi thêm coupon:", error.response?.data || error.message);
      throw error;
    }
  };
  
// Hàm lấy coupon theo ID
export const getCouponById = async (id) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/showById/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy coupon theo ID:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy coupon theo mã
export const getCouponByCode = async (code) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.post(`${API_URL}/getByCode`, { code }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy coupon theo mã:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm cập nhật coupon
export const updateCoupon = async (id, couponData) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, couponData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật coupon:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm cập nhật trạng thái coupon
export const updateCouponStatus = async (id, statusData) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.patch(`${API_URL}/updateStatus/${id}`, statusData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái coupon:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm xóa coupon
export const deleteCoupon = async (id) => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa coupon:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm tạo mã coupon
export const makeCouponCode = async () => {
  const token = getTokenFromLocalStorage();
  try {
    const response = await axios.get(`${API_URL}/make-code-coupon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo mã coupon:", error.response?.data || error.message);
    throw error;
  }
};
// Hàm lấy coupon theo ID
// export const getCouponById = async (id) => {
//     const token = getTokenFromLocalStorage();
//     return axios.get(`${API_URL}/coupon/showById/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };
  
//   // Hàm thêm coupon mới
//   export const addCoupon = async (couponData) => {
//     const token = getTokenFromLocalStorage();
//     return axios.post(`${API_URL}/coupon/add`, couponData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//   };
  
  // // Hàm cập nhật coupon
  // export const updateCoupon = async (id, couponData) => {
  //   const token = getTokenFromLocalStorage();
  //   return axios.put(`${API_URL}/coupon/update/${id}`, couponData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // };