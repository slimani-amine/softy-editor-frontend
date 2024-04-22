import Input from '@/components/Shared/Input/Input';
import Button from '@/components/Shared/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const ResetPasswordForm = ({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isLoading,
}: any) => {
  return (
    <form
      className="flex flex-col justify-between w-full gap-4 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter your password..."
          errors={errors}
          label="Password"
          type="password"
          autoComplete="password"
          aria-label="Enter your password..."
          className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500 pr-10"
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
          className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
          name="confirmPassword"
          register={register}
        />
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
