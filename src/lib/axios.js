import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Important: Send cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request already retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // If refresh token also fails, logout
    if (originalRequest.url === "/auth/refresh") {
      isRefreshing = false;
      // Redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Wait for refresh to complete
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return axiosInstance(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Try to refresh token
      await axiosInstance.post("/auth/refresh");

      isRefreshing = false;
      processQueue(null);

      // Retry original request
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError, null);

      // Redirect to login on refresh failure
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
