import axios from 'axios';

export const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const client = axios.create({
  baseURL: `${API_BASE}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// client.interceptors.request.use(
//   async config => {
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );
