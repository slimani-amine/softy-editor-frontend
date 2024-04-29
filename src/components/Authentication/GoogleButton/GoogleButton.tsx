import React, { useEffect } from 'react';
import GoogleIcon from '../../Shared/Icons/googleIcon';
import { Button } from '@/components/ui/button';
import { usegoogleLoginQuery } from '@/services/queries/auth.query';
import toast from 'react-hot-toast';
import { exchangeCodeForIdToken } from '@/services/api/auth.service';
import useAuthStore from '@/store/useAuthStore';
import { useGoogleLogin } from '@react-oauth/google';
import { setTokens } from '@/lib/utils/token';

const GoogleButton: React.FC = () => {
  const {
    isLoading,
    mutateAsync: loginWithGoogle,
    isError,
    error,
  }: any = usegoogleLoginQuery();

  const { setIsAuthenticated, setUser } = useAuthStore((state: any) => state);

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      if (errorMessage?.userName) {
        toast.error('UserName already used');
      } else if (errorMessage?.email) {
        toast.error('Email already used');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError, error]);

  const onSuccess = async (tokenResponse: any) => {
    const idToken = await exchangeCodeForIdToken(tokenResponse?.code);

    const res = await loginWithGoogle({ idToken });

    if (res) {
      const { token: accessToken, refreshToken, user } = res;
      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
    } else {
      toast.error('something went wrong');
    }
  };

  const Googlelogin = useGoogleLogin({
    onSuccess,
    onError: (error) => console.log(error),
    flow: 'auth-code',
  });
  
  return (
    <div className="w-full flex items-center justify-center dark:bg-gray-800 mb-2">
      <Button
        className="w-full items-center justify-center h-9 px-2 py-1 border flex border-color dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={Googlelogin}
      >
        <GoogleIcon />
        <span className=" text-black ">Continue with Google</span>
      </Button>
    </div>
  );
};

export default GoogleButton;
