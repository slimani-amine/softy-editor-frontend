import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from '@/lib/validation';
import { useRegisterQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { RegisterBody } from 'shared/types/auth';
import toast from 'react-hot-toast';

import AuthNav from 'shared/components/AuthNav';
import { setTokens } from '@/lib/utils/token';
import RegisterForm from './_components/RegisterForm';
import GoogleButton from '../Login/_components/GoogleButton';
import Terms from '../Login/_components/Terms';

const Register = () => {
  const { setIsAuthenticated, setUser } = useAuthStore((state) => state);
  const {
    isLoading,
    mutateAsync: Register,
    isError,
    error,
  }: any = useRegisterQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(RegisterSchema) });
  
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

  const onSubmit: SubmitHandler<RegisterBody> = async (data) => {
    const res = await Register(data);
    if (res) {
      const { token: accessToken, refreshToken, user } = res;
      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <AuthNav />

      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible flex justify-center items-center z-10">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-5 bg-white p-10 shadow-2xl rounded-2xl">
          <div className="flex flex-col items-start ">
            <h1 className=" text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Join a global movement.
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Sign up now!
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <RegisterForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              isLoading={isLoading}
            />
            <hr className="h-1 w-full mb-5 border-gray-200" />

            <GoogleButton />

            <Terms className='' />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
