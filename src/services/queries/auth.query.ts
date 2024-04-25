import { useMutation } from '@tanstack/react-query';
import {
  LoginWithGoogleBody,
  RegisterBody,
  ResetPasswordBody,
  SendMailBody,
  UpdateUserBody,
  type LoginBody,
} from '@/types/auth';
import {
  login,
  googleLogin,
  register,
  resetPassword,
  sendmail,
  emailLogin,
  updateUser,
} from '../api/auth.service';

export const useLoginQuery = () =>
  useMutation(['login'], async (body: LoginBody) => {
    const res = await login(body);
    return res;
  });
export const useEmailLoginQuery = () =>
  useMutation(['EmailLogin'], async (body: LoginBody) => {
    const res = await emailLogin(body);
    return res;
  });

export const usegoogleLoginQuery = () =>
  useMutation(['googleLogin'], async (body: LoginWithGoogleBody) => {
    const res = await googleLogin(body);
    return res;
  });

export const useRegisterQuery = () =>
  useMutation(['register'], async (body: RegisterBody) => {
    const res = await register(body);
    return res;
  });

export const useUpdateUserQuery = () =>
  useMutation(['updateUser'], async (body: UpdateUserBody) => {
    const res = await updateUser(body);
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
