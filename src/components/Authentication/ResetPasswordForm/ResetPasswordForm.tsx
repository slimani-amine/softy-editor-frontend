import Input from '@/components/Shared/Input/Input';
import Button from '@/components/Shared/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';

const ResetPasswordForm = ({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isLoading,
  isValid,
}: any) => {
  const [validationErrors, setValidationErrors] = useState<{
    password: { message: string };
  }>({ password: { message: '' } });
  return (
    <form
      className="flex flex-col justify-between w-full gap-4 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter your new password..."
          errors={errors}
          label="New password"
          type="password"
          autoComplete="password"
          aria-label="Enter your new password..."
          className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
          name="password"
          register={register}
        />

        <Input
          placeholder="confirm your password..."
          errors={errors}
          label="Confirm password"
          type="password"
          autoComplete="confirmPassword"
          aria-label="confirm your password..."
          className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
          name="confirmPassword"
          register={register}
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <Button
          text="Continue"
          type="submit"
          isLoading={isLoading}
          disabled={!isValid}
          className="w-full flex items-center justify-center h-8 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 disabled:opacity-40  "
        />
        {errors && errors && (
          <span className="text-red-500">
            {errors?.email?.message
              ? errors?.email?.message
              : errors?.code?.message
              ? errors?.code?.message
              : errors?.password?.message}
          </span>
        )}
        <span className="text-red-500">
          {validationErrors.password.message}
        </span>
        <a className="text-sm ">
          Resend an email?{' '}
          <Link
            to={'/forgot-password'}
            className="cursor-pointer hover:underline text-sm text-blue-500 "
          >
            click here
          </Link>
        </a>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
