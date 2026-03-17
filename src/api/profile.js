import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL;

export const profileData = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/user/get-profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
