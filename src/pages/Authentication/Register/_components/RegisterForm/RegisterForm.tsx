import Button from 'shared/components/Shared/Button';
import Input from 'shared/components/Shared/Input';
import { Link } from 'react-router-dom';

export default function RegisterForm({
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
          placeholder="Enter your userName..."
          errors={errors}
          type="userName"
          autoComplete="userName"
          label="UserName"
          aria-label="Enter your userName..."
          className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
          name="userName"
          register={register}
        />

        <Input
          placeholder="Enter your email address..."
          errors={errors}
          type="email"
          autoComplete="email"
          label="Email"
          aria-label="Enter your email address..."
          className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
          name="email"
          register={register}
        />

        <Input
          placeholder="Enter your password..."
          errors={errors}
          type="password"
          autoComplete="password"
          label="Password"
          aria-label="Enter your password..."
          className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500 pr-10"
          name="password"
          register={register}
        />

        <Input
          placeholder="confirm your password..."
          errors={errors}
          type="password"
          autoComplete="confirmPassword"
          label="Confirm password"
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
  );
}
