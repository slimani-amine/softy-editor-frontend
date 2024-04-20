import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from '@/types/auth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginForm from './LoginForm';
import GoogleButton from '@/components/Authentication/GoogleButton';
import Terms from '@/components/Authentication/Terms';
import AuthNav from '@/components/Authentication/AuthNav';
export const randomIcons = [];

const Login = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
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
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    if (isError && error) {
      console.log('🚀 ~ useEffect ~ error:', error);
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
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <AuthNav />
      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible flex flex-col justify-center items-center z-10 ">
        <div className="w-full  mx-auto flex flex-col gap-5 bg-white p-10 shadow-2xl rounded-2xl">
          <div className="flex flex-col items-start ">
            <h1 className=" text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Think it. Make it.
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Sign into your Softy-Editor account
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <LoginForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              togglePasswordVisibility={togglePasswordVisibility}
              isLoading={isLoading}
            />
            <hr className="h-1 w-full mb-5 border-gray-400" />

            <GoogleButton />
            <Terms />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
