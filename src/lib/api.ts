import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';
import { getTokens } from './utils/token';
import { BASE_URL } from 'shared/config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
});

axiosInstance.interceptors.request.use((config) => {
  const { access_token } = getTokens();
  config.headers = {
    ...(config.headers as any),
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${access_token}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(successInterceptor, errorInterceptor);

export { axiosInstance as api };
