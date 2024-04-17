import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Input/Input';
import { RegisterSchema } from '@/lib/validation';
import { useRegisterQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { RegisterBody } from '@/types/auth';
import { Button as UIButton } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/googleIcon';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const {
    isLoading,
    mutateAsync: Register,
    isError,
    error,
  } = useRegisterQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(RegisterSchema) });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
  };
  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      console.log('🚀 ~ useEffect ~ errorMessage:', errorMessage);
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
      toast.success('Welcome');
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <div
        className={
          'bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6'
        }
      >
        <Link to="/" className="flex items-center w-full">
          <span className="font-semibold text-gray-500 text-lg">
            Softy-Editor
          </span>
        </Link>
      </div>
      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible justify-center items-cente mt-20">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col items-start ">
            <h1 className=" text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Join a global movement.
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Sign up now!
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <form
              className="flex flex-col justify-between w-full gap-4 mb-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="notion-userName-input"
                    className="block mb-1 text-xs font-medium text-gray-500"
                  >
                    UserName
                  </label>
                  <Input
                    placeholder="Enter your userName..."
                    errors={errors}
                    type="userName"
                    autoComplete="userName"
                    aria-label="Enter your userName..."
                    className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                    name="userName"
                    register={register}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="block mb-1 text-xs font-medium text-gray-500">
                    Email
                  </label>
                  <Input
                    placeholder="Enter your email address..."
                    errors={errors}
                    type="email"
                    autoComplete="email"
                    aria-label="Enter your email address..."
                    className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                    name="email"
                    register={register}
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="notion-email-input"
                    className="block mb-1 text-xs font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <Input
                    placeholder="Enter your password..."
                    errors={errors}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="password"
                    aria-label="Enter your password..."
                    className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500 pr-10"
                    name="password"
                    register={register}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2 mt-6"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-1 relative">
                  <label className="block mb-1 text-xs font-medium text-gray-500">
                    Confirm password
                  </label>
                  <Input
                    placeholder="confirm your password..."
                    errors={errors}
                    type={showPassword2 ? 'text' : 'password'}
                    autoComplete="confirmPassword"
                    aria-label="confirm your password..."
                    className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                    name="confirmPassword"
                    register={register}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2 mt-6"
                    onClick={togglePasswordVisibility2}
                  >
                    {showPassword2 ? (
                      <FaEye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FaEyeSlash className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <Button
                  text="Continue"
                  type="submit"
                  isLoading={isLoading}
                  className="w-full flex items-center justify-center h-10 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2"
                />
                <a className="text-sm ">
                  You have an account?{' '}
                  <Link
                    to={'/login'}
                    className="cursor-pointer hover:underline text-sm text-blue-500 "
                  >
                    Login
                  </Link>
                </a>
              </div>
            </form>
            <hr className="h-1 w-full mb-5 border-gray-300" />

            <div className="w-full flex items-center justify-center dark:bg-gray-800 mb-5">
              <UIButton className="w-full items-center justify-center h-10 px-4 py-1 border flex border-gray-300 dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <GoogleIcon />
                <span className="font-semibold text-black ">
                  Continue with Google
                </span>
              </UIButton>
            </div>
            <div className="w-full mb-0 text-xs text-gray-400 text-center">
              <p className="mb-0">
                By continuing, you acknowledge that you understand and agree to
                the{' '}
                <a
                  href="https://www.notion.so/Personal-Use-Terms-of-Service-00e4e5d0f2b9411cbee6493f15779500"
                  rel="noopener noreferrer"
                  className="inline text-gray-300 hover:text-blue-500 no-underline cursor-pointer"
                >
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a
                  href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
                  rel="noopener noreferrer"
                  className="inline text-gray-300 hover:text-blue-500 no-underline cursor-pointer"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
