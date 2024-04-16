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
  } catch (error) {
    throw error;
  }
};

export const register = async (body: RegisterBody) => {
  try {
    const { data } = await api.post(`${BASE_URL}/auth/email/register`, body);
    console.log('🚀 ~ register ~ data:', data);
    cookies.set('accessToken', data.token, { path: '/' });
    cookies.set('refreshToken', data.refreshToken, { path: '/' });
    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const sendmail = async (body: SendMailBody) => {
  try {
    // Perform sending email logic here
    // For example, make a POST request to the send mail endpoint
    // const { data } = await api.post(`${BASE_URL}/auth/sendmail`, body);
    // Return the response if needed
    // return data;
    // For demonstration purposes, I'm returning a mock response
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Sending email failed:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export const resetPassword = async (body: ResetPasswordBody) => {
  try {
    // Perform password reset logic here
    // For example, make a POST request to the reset password endpoint
    // const { data } = await api.post(`${BASE_URL}/auth/resetpassword`, body);
    // Return the response if needed
    // return data;
    // For demonstration purposes, I'm returning a mock response
    return { success: true, message: 'Password reset successful' };
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
};
