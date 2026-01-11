import axios from "axios";
import { toast } from "react-toastify";

const customNavigate = (path) => {
  window.location.href = path;
};

const BASE_URL = "http://localhost:3002/";

//192.168.29.22
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const handleApiError = (error) => {
  if (error.response) {
    console.error("Data:", error.response.data?.error);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);

    const errorMessage = error.response.data?.message || '';
    const statusCode = error.response.status;

    // Only clear localStorage and redirect for actual authentication errors (401, 403)
    // or specific token-related error messages
    if (
      statusCode === 401 ||
      statusCode === 403 ||
      errorMessage === "Token expired" ||
      errorMessage === "Invalid token" ||
      errorMessage === "Token not found" ||
      errorMessage === "Admin not found"
    ) {
      toast.error("Your session has expired. Please login again.");
      localStorage.removeItem('token'); // Only remove token, not clear everything
      customNavigate('/login');
    } else {
      // For other errors, just show the error message without clearing localStorage
      toast?.error(error.response.data?.error || error.response.data?.message || 'Something went wrong');
    }
  } else if (error.request) {
    console.error("Request:", error.request);
    toast?.error("Network error. Please check your connection.");
  } else {
    console.error("Error:", error.message);
    toast?.error("An error occurred. Please try again.");
  }
  console.error("Config:", error.config);
};

const getAuthToken = () => {
  const token = localStorage.getItem("token");

  return token;
};
// const token = import.meta.env.VITE_REACT_APP_TOKEN

export const apiService = {
  async get(endpoint) {
    const isAuth = getAuthToken();
    try {
      const config = {
        // params,
        headers: { Authorization: `Bearer ${isAuth}`, country: "india" },
        // headers: { Authorization: "Bearer " + token }
      };

      const response = await api.get(endpoint, isAuth ? config : null);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async post(endpoint, data = {}) {
    try {
      const isAuth = getAuthToken();
      const config = {
        headers: isAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : // ? { Authorization: "Bearer " + token }
            {},
      };
      const response = await api.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async put(endpoint, data = {}, requiresAuth = true) {
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : {},
      };
      const response = await api.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  async delete(endpoint, requiresAuth = true) {
    try {
      const config = {
        headers: requiresAuth
          ? { Authorization: `Bearer ${getAuthToken()}`, country: "india" }
          : {},
      };
      const response = await api.delete(endpoint, config);
      return response.data;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};

export default api;
