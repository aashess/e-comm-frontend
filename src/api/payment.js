import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL;
const csrfToken = localStorage.getItem("csrfToken");

export const payment = async (orderBook) => {
  try {
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