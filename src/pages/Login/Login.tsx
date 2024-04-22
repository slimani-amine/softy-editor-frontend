import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from '@/types/auth';
import toast from 'react-hot-toast';
import LoginForm from '../../components/Authentication/LoginForm/LoginForm';
import GoogleButton from '@/components/Authentication/GoogleButton';
import Terms from '@/components/Authentication/Terms';
import AuthNav from '@/components/Authentication/AuthNav';
import { setTokens } from '@/lib/utils/token';
import AppleButton from '@/components/Authentication/AppleButton';

const Login = () => {
  const { setIsAuthenticated, setUser } = useAuthStore((state) => state);
  const {
    isLoading,
    mutateAsync: login,
    isError,
    error,
  }: any = useLoginQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors as any;
      if (errorMessage.email) {
        toast.error('Email not found');
      } else if (errorMessage.password) {
        toast.error('Password incorrect');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    const res = await login(data);
    if (res) {
      const { token: accessToken, refreshToken, user } = res;
      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <AuthNav />
      <section className="px-4 md:px-40 w-[34%] max-xl:w-full h-full mx-auto overflow-visible flex flex-col justify-center items-center z-10 ">
        <div className="w-full  mx-auto flex flex-col gap-5 ">
          <div className="flex flex-col items-start mb-5">
            <h1 className=" text-2xl font-semibold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Think it. Make it.
            </h1>
            <h2 className="text-[#ACABA9] text-[1.4rem] font-semibold">
              Sign into your E-ditor account
            </h2>
          </div>
          <div className="flex flex-col items-center  ">
            <GoogleButton />
            <AppleButton />
            <hr className="h-1 w-full mb-5 mt-5 border-color" />
            <LoginForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              isLoading={isLoading}
            />
            <Terms />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
