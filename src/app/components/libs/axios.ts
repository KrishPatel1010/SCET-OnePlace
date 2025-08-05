// utils/axios.ts
import axios from 'axios';

let token: string | null = null;

export const setAxiosToken = (newToken: string) => {
  token = newToken;

  console.log("axios token", token)
};

const API = axios.create({
  baseURL: 'http://localhost:5000',
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
