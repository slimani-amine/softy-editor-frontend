import { ResetPasswordBody, SendMailBody, type LoginBody } from '@/types/auth';

export const login = async (body: LoginBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.email !== 'slimaniamin76@gmail.com') {
      reject(new Error('Invalid email'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};

export const register = async (body: LoginBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.email !== 'slimaniamin76@gmail.com') {
      reject(new Error('Invalid email'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};

export const sendmail = async (body: SendMailBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};


export const resetPassword = async (body: ResetPasswordBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
