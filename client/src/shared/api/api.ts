import axios from 'axios';
import { LOCAL_STORAGE_JWT_KEY } from '../constants/localstorage';

export const $api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${localStorage.getItem(LOCAL_STORAGE_JWT_KEY)}`;

  return config;
});

// $api.interceptors.response.use((response) => {});
