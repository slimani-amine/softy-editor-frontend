import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Input/Input';
import { ResetPasswordSchema } from '@/lib/validation';
import { useResetPasswordQuery } from '@/services/queries/auth.query';
import { ResetPasswordBody } from '@/types/auth';
import Button from '@/components/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const {
    isLoading,
    mutateAsync: ResetPassword,
    isError,
    error,
  } = useResetPasswordQuery();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      if (errorMessage?.hash) {
        toast.error('An error occurred. Please try with the right link.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError, error]);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ResetPasswordBody> = async (data) => {
    const hash = searchParams.get('hash');
    if (!hash) {
      toast.error('An error occurred. Please try with the right link.');
      return;
    }
    const expires = Number(searchParams.get('expires'));
    if (!expires || expires < Date.now()) {
      toast.error(
        "Oops! Looks like your password reset link has expired. Don't worry, you can always try again "
      );
    }
    const body = { password: data.password, hash };
    await ResetPassword(body);
    navigate('/login');
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevShowPassword2) => !prevShowPassword2);
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
              Think it. Make it.
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Sign into your Softy-Editor account
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <form
              className="flex flex-col justify-between w-full gap-4 mb-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
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
                  Resend an email?{' '}
                  <Link
                    to={'/forget-password'}
                    className="cursor-pointer hover:underline text-sm text-blue-500 "
                  >
                    click here
                  </Link>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
