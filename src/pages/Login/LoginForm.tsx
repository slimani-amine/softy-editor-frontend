import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LoginForm({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isLoading,
}: any) {
  return (
    <form
      className="flex flex-col justify-between w-full gap-4 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter your email address..."
          errors={errors}
          type="email"
          label="Email"
          autoComplete="email"
          aria-label="Enter your email address..."
          className="w-full outline-none border border-gray-400 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
          name="email"
          register={register}
        />

        <Input
          placeholder="Enter your password..."
          errors={errors}
          type="password"
          label="Password"
          autoComplete="password"
          aria-label="Enter your password..."
          className="w-full outline-none border border-gray-400 rounded-[5px] px-4 py-1 placeholder:text-gray-500 pr-10"
          name="password"
          register={register}
        />

        <Link
          to="/forgot-password"
          className="cursor-pointer  text-blue-500 hover:underline text-sm mt-1"
        >
          Forgot your password?
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <Button
          text="Continue"
          type="submit"
          isLoading={isLoading}
          className="w-full flex items-center justify-center h-10 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2"
        />
        <a className="text-sm ">
          Don't have an account?{' '}
          <Link
            to={'/register'}
            className="cursor-pointer hover:underline text-sm text-blue-500 "
          >
            Register
          </Link>
        </a>
      </div>
    </form>
  );
}
