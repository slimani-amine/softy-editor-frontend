import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { errorInterceptor, successInterceptor } from './interceptors';
import { clearTokens, getTokens, setTokens } from './utils/token';
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

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const previousRequest = error?.config;
    console.log('🚀 ~ previousRequest:', previousRequest);
    console.log('🚀 ~ error?.response?.status:', error?.response?.status);
    if (error?.response?.status === 401 && !previousRequest?.sent) {
      console.log('🚀 ~ previousRequest:', previousRequest.sent);
      previousRequest.sent = true;
      try {
        const { refresh_token } = getTokens();
        console.log('🚀 ~ refresh_token:', refresh_token);
        const response = await axios.get(BASE_URL + '/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        console.log('🚀 ~ response:', response);
        const { token: accessToken } = response.data.payload;
        console.log('🚀 ~ accessToken:', accessToken);
        setTokens(accessToken);
        previousRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(previousRequest);
      } catch (err) {
        // clearTokens();
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong!',
    );
  },
);

axiosInstance.interceptors.response.use(successInterceptor, errorInterceptor);

export { axiosInstance as api };
