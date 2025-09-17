// utils/axios.ts
import axios from 'axios';

let token: string | null = null;

export const setAxiosToken = (newToken: string) => {
  token = newToken;
};

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
});

API.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
