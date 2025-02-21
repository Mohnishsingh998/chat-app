import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,  // this is the important part for cookies to be sent with the request
});