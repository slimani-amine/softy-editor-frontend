import { api } from '@/lib/api';
import {
  GetUsersByEmailsBody,
  LoginBody,
  LoginWithGoogleBody,
  RegisterBody,
  ResetPasswordBody,
  SendMailBody,
  UpdateUserBody,
} from 'shared/types/auth';
import axios from 'axios';
import { BASE_URL, googleClientId, googleRedirect, googleSecret } from 'shared/config';

export const login = async (body: LoginBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/login`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const emailLogin = async (body: LoginBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/login`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const googleLogin = async (body: LoginWithGoogleBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/google/login`, body);
    return data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const updateUser = async (body: UpdateUserBody) => {
  try {
    const { data } = await api.patch(`${BASE_URL}/users/${body.id}`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};

export async function exchangeCodeForIdToken(authorizationCode: string) {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: googleClientId,
      client_secret: googleSecret,
      code: authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: googleRedirect,
    });
    return response.data.id_token;
  } catch (error) {
    console.error("🚀 ~ exchangeCodeForIdToken ~ error:", error)
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

export const getUsersByEmails = async (body: GetUsersByEmailsBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/users/emails`, body);
    return data;
  } catch (error: any) {
    throw error;
  }
};
