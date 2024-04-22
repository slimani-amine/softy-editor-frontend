import { api } from '@/lib/api';
import {
  LoginBody,
  LoginWithGoogleBody,
  RegisterBody,
  ResetPasswordBody,
  SendMailBody,
} from '@/types/auth';
import axios from 'axios';
import { googleClientId, googleSecret } from 'shared/config/google-config';

export const BASE_URL = 'http://localhost:3000/api/v1';

export const login = async (body: LoginBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/login`, body);

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const googleLogin = async (body: LoginWithGoogleBody) => {
  console.log('🚀 ~ googleLogin ~ body:', body);
  try {
    const { data } = await api.post(`${BASE_URL}/auth/google/login`, body);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export async function exchangeCodeForIdToken(authorizationCode: string) {
  console.log(
    '🚀 ~ exchangeCodeForIdToken ~ authorizationCode:',
    authorizationCode
  );
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: googleClientId,
      client_secret: googleSecret,
      code: authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:5173',
    });

    return response.data.id_token;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return null;
  }
}

export const register = async (body: RegisterBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/register`, body);

    return data;
  } catch (error: any) {
    throw error;
  }
};

export const sendmail = async (body: SendMailBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/forgot/password`, body);
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
