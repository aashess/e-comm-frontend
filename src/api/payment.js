import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL;
const csrfToken = localStorage.getItem("csrfToken");

export const orderCreate = async (orderBook) => {
  try {
    console.log("OrderBook", orderBook);
    
    const response = await axios.post(
      `${API_BASE}/payment/order`,
      orderBook,
      {
        withCredentials: true,
        headers: {
          csrfToken: `${csrfToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Something went wrong while creating Payment Order...", error);
    throw error;
  }
};

export const verifyPayment = async (order) => {
  console.log(order);
  
  try {
    const response = await axios.post(`${API_BASE}/payment/verify`,
      order,
      {
        withCredentials: true,
        headers: {
          csrfToken: `${csrfToken}`,
        }
      }
    )
    return response
  } catch (error) {
    console.error("Something went wrong while Verfiying Payment", error);
    throw error;
  }
}