import axios from "axios"
import { ACCESS_TOKEN } from "./constant"
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const publicRoutes = [
    '/api/user/register/',
    '/api/token/'
]
const API_URL = import.meta.env.VITE_API_URL;


export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.post(`${API_URL}/api/refresh/`, {
        refresh: refreshToken,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('accessToken', response.data.access);
      return response.data.access;
    } catch (error) {
      console.error('Token refresh failed:', error.response?.data || error.message);
      throw error; // Let the calling function handle the error
    }
  };


  // Function to make protected API requests with token refresh
  export const fetchProtectedData = async (url, options = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    try {
      const response = await axios({
        method: options.method || 'GET',
        url: `${API_URL}/${url}`,
        headers: { 
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        ...options,
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401 && !error.config._retry) {
        error.config._retry = true;
        accessToken = await refreshToken();
        return axios({
          method: options.method || 'GET',
          url: `${API_URL}/${url}`,
          headers: { Authorization: `Bearer ${accessToken}` },
          ...options,
        }).then(response => response.data);
      }
      throw error;
    }
  };
api.interceptors.request.use(
    (config) => {
        // Skip auth header for public routes
        if (publicRoutes.includes(config.url)) {
            return config
        }
        
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api