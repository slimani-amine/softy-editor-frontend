import { useMutation } from '@tanstack/react-query';
import { RegisterBody, ResetPasswordBody, SendMailBody, type LoginBody } from '@/types/auth';
import { login, register, resetPassword, sendmail } from '../api/auth.service';

export const useLoginQuery = () =>
  useMutation(['login'], async (body: LoginBody) => {
    const res = await login(body);
    return res;
  });

export const useRegisterQuery = () =>
  useMutation(['register'], async (body: RegisterBody) => {
    const res = await register(body);
    return res;
  });

export const useSendMailQuery = () =>
  useMutation(['sendMail'], async (body: SendMailBody) => {
    const res = await sendmail(body);
    return res;
  });

export const useResetPasswordQuery = () =>
  useMutation(['resetPassword'], async (body: ResetPasswordBody) => {
    const res = await resetPassword(body);
    return res;
  });
