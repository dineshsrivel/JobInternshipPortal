import axios from 'axios';

// Create base Axios instance for production backend REST API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jobportal-admin.com/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Request interceptor for attaching Auth Bearer tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized session expire
      console.warn('Session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export default api;
