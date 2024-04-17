import { api } from '@/lib/api';
import {
  LoginBody,
  RegisterBody,
  ResetPasswordBody,
  SendMailBody,
} from '@/types/auth';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const BASE_URL = 'http://localhost:3000/api/v1';

export const login = async (body: LoginBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/login`, body);
    console.log('🚀 ~ login ~ data:', data);

    cookies.set('accessToken', data.token, { path: '/' });
    cookies.set('refreshToken', data.refreshToken, { path: '/' });

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const register = async (body: RegisterBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/register`, body);

    cookies.set('accessToken', data.token, { path: '/' });
    cookies.set('refreshToken', data.refreshToken, { path: '/' });

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const sendmail = async (body: SendMailBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/forgot/password`, body);
    console.log('🚀 ~ sendmail ~ data:', data);
    return data;
  } catch (error: any) {
    console.log('errorr');

    throw error;
  }
};

export const resetPassword = async (body: ResetPasswordBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/reset/password`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};
