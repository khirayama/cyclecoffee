import axios, { AxiosInstance } from 'axios';

// tslint:disable-next-line:export-name
export const req: AxiosInstance = axios.create({
  // tslint:disable-next-line:no-http-string
  baseURL: `http://127.0.0.1:${process.env.PORT || '3030'}`,
});
