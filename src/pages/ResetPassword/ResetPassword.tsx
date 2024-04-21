import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '@/lib/validation';
import { useResetPasswordQuery } from '@/services/queries/auth.query';
import { ResetPasswordBody } from '@/types/auth';
import {  useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import ResetPasswordIcon from '@/components/Shared/Icons/ResetPasswordIcon';
import AuthNav from '@/components/Authentication/AuthNav';
import ResetPasswordForm from '../../components/Authentication/ResetPasswordForm/ResetPasswordForm';

const ResetPassword = () => {
  const {
    isLoading,
    mutateAsync: ResetPassword,
    isError,
    error,
  }: any = useResetPasswordQuery();
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

  return (
    <div className="h-full flex flex-col justify-center ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <AuthNav />

      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible flex justify-center items-center z-10">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-5 bg-white p-10 shadow-2xl rounded-2xl">
          <div className="flex flex-col items-start ">
            <h1 className=" text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Reset Your Password
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Continue Creating with Softy-Editor
            </h2>
          </div>
          <div className="flex flex-col items-center ">
            <ResetPasswordForm  handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} register={register} isLoading={isLoading}  />
          </div>
          <div className="flex justify-center items-center">
            <ResetPasswordIcon />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;

  