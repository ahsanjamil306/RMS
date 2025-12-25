import axios from 'axios';
import { apiEndpoints } from '@/constants/apiEndpoints';

const isDevelopment = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: apiEndpoints.BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to requests if available
    if (typeof window !== 'undefined') {
      try {
        const persistedState = localStorage.getItem('persist:root');
        if (persistedState) {
          const parsed = JSON.parse(persistedState);
          const authState = parsed.auth ? JSON.parse(parsed.auth) : null;
          const token = authState?.token;

          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (Unauthorized) - session expired
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      if (typeof window !== 'undefined') {
        // Clear persisted state
        localStorage.removeItem('persist:root');
        // Dispatch custom event for session expiry
        window.dispatchEvent(new CustomEvent('session-expired'));
        // Redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
