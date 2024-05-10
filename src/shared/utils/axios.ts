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
    console.log("🚀 ~ previousRequest:", previousRequest)
    console.log("🚀 ~ error?.response?.status:", error?.response?.status)
    if (error?.response?.status === 401 && !previousRequest?.sent) {
      console.log("🚀 ~ previousRequest:", previousRequest.sent)
      previousRequest.sent = true;
      try {
        const { refresh_token } = getTokens();
        console.log("🚀 ~ refresh_token:", refresh_token)
        const response = await axios.get(baseURL + '/auth/refresh', {
          headers: {
            Authorization: `Bearer ${refresh_token}`,
          },
        });
        console.log("🚀 ~ response:", response)
        const { token:accessToken } = response.data.payload;
        console.log("🚀 ~ accessToken:", accessToken)
        setTokens(accessToken);
        previousRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        return axiosInstance(previousRequest);
      } catch (err) {
        // clearTokens();
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong!'
    );
  }
);

export default axiosInstance;