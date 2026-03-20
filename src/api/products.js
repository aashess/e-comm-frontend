import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
const csrfToken = localStorage.getItem('csrfToken')
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


export const addToCart = async (productId, quantity) => {
  try {
    console.log(localStorage.getItem("csrfToken"));
    // console.log(localStorage.getItem(csrftoken));
    
    const response = await axios.post(`${API_BASE}/api/cart/addToCart`, 
      {productId, quantity}, 
      {withCredentials: true,
      headers: {
      csrfToken: `${csrfToken}`,
      "Content-Type": "application/json",
    },
      }
    );
    return response.status;
  } catch (error) {
    console.error('Something went wrong from the server.', error)
  }
}

export const getAllCartItems = async() => {
  try {
    const response = await axios.get(`${API_BASE}/api/cart/getAllCartItems`,
      {withCredentials: true,
        headers:  {
          csrfToken: `${csrfToken}`
        }
      }
    )
    return response
  } catch (error) {
    console.error('Something went wrong from the server.', error)    
  }
}

