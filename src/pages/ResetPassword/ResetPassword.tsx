import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '@/lib/validation';
import { useResetPasswordQuery } from '@/services/queries/auth.query';
import { ResetPasswordBody } from '@/types/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(ResetPasswordSchema),
  });

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
      return;
    }
    const body = { password: data.password, hash };
    await ResetPassword(body);
    navigate('/login');
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <AuthNav />
      <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center mt-16 ">
        <div className="w-full  mx-auto flex flex-col gap-5 ">
          <div className="flex flex-col items-start mb-5 leading-3">
            <h1 className="text-2xl font-semibold text-center  max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Reset Your Password
            </h1>
            <h2 className="text-[#acaba9] text-2xl font-semibold leading-3">
              Continue Creating with E-ditor
            </h2>
          </div>
          <div className="flex flex-col items-center "></div>
          <div className="flex flex-col items-center  ">
            <ResetPasswordForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              isLoading={isLoading}
              isValid={isValid}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResetPassword;
