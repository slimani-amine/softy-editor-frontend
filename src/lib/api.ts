import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';
import { getTokens } from './utils/token';
import { BASE_URL } from 'shared/config';
const { access_token } = getTokens();

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${access_token}`,
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
