import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Input/Input';
import { ResetPasswordSchema } from '@/lib/validation';
import { useResetPasswordQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { ResetPasswordBody } from '@/types/auth';
import { Button as UIButton } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/googleIcon';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const {
    isLoading,
    mutateAsync: ResetPassword,
    isError,
    error,
  } = useResetPasswordQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordBody>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error as string, { theme: 'colored' });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<ResetPasswordBody> = async (data) => {
    await ResetPassword(data);
    setIsAuthenticated(true);
  };

  return (
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="notion-email-input"
                  className="block mb-1 text-xs font-medium text-gray-500"
                >
                  Password
                </label>
                <Input
                  placeholder="Enter a new password..."
                  errors={errors}
                  type="password"
                  autoComplete="password"
                  aria-label="Enter a new password..."
                  className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                  name="password"
                  register={register}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="block mb-1 text-xs font-medium text-gray-500">
                  Confirm password
                </label>
                <Input
                  placeholder="confirm your password..."
                  errors={errors}
                  type="password"
                  autoComplete="confirmPassword"
                  aria-label="confirm your password..."
                  className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                  name="confirmPassword"
                  register={register}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
              <Button
                text="Continue"
                type="submit"
                isLoading={isLoading}
                className="w-full flex items-center justify-center h-10 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
