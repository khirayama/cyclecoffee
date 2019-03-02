import axios, { AxiosInstance } from 'axios';

export const req: AxiosInstance = axios.create({
  baseURL: `http://127.0.0.1:${process.env.PORT || '3030'}`,
});
