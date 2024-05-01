import { clearTokens, getTokens, setTokens } from '@/lib/utils/token';
import axios from 'axios';
import { BASE_URL } from 'shared/config';

const baseURL = BASE_URL;
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const axiosInstance = axios.create({
  baseURL,
  headers,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { access_token } = getTokens();
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const previousRequest = error?.config;
    if (error?.response?.status === 401 && !previousRequest?.sent) {
      previousRequest.sent = true;
      try {
        const { refresh_token } = getTokens();
        const response = await axios.get(baseURL + '/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        const { accessToken } = response.data.payload;
        setTokens(accessToken);
        previousRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(previousRequest);
      } catch (err) {
        clearTokens();
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong!'
    );
  }
);

export default axiosInstance;