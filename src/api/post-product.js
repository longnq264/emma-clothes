import axios from "axios";
const API_URL = "http://localhost:8000/api";

export const createProductItem = async (productData) => {
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

// http://127.0.0.1:8000/api/products/{productId}/variants

export const createProductVariants = async (productId, productData) => {
  try {
    const response = await axios.post(
      `${API_URL}/products/${productId}/variants`,
      productData
    );
    console.log("Create attribute response:", response.data);
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

// http://127.0.0.1:8000/api/products/{idProduct}

export const getProductItems = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
// http://127.0.0.1:8000/api/products/variants/update-multiple

export const updateMultiple = async (productData) => {
  try {
    const response = await axios.post(
      `${API_URL}/products/variants/update-multiple`,
      productData
    );
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
