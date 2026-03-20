import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;

// Google authentication
export const googleLogin = async () => {
  try {
    const response = await axios.get(`${API_BASE}/auth/google/login`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Email/password login
export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_BASE}/api/user/login`,
      { email: email.trim(), password },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// User registration
export const register = async (name, email, password, role) => {
  try {
    const response = await axios.post(`${API_BASE}/api/user/register`, {
      name: name.trim() || undefined,
      email: email.trim(),
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user details
export const getUser = async () => {
  try {
    const response = await axios.get(`${API_BASE}/api/user/get-profile/`, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};