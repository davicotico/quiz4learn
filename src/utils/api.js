import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://opentdb.com/',
  timeout: 5000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  },
);
