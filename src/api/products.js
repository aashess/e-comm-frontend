import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/product/all-products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};



// Get all subcategories
export const getAllSubcategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE}/api/product/all-subcategories`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/product/create-product`,
      productData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

