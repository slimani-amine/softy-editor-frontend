import { type LoginBody } from '@/types/auth';

// Dummy login request that will resolve in 2 seconds
export const login = async (body: LoginBody) => {
  const res = new Promise<boolean>((resolve, reject) => {
    if (body.email !== 'slimaniamin76@gmail.com' ) {
      reject(new Error('Invalid username or password'));
    }

    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
  return await res;
};
