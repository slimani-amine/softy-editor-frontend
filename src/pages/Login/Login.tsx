import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Input/Input';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from '@/types/auth';
import { Button as UIButton } from '@/components/ui/button';
import GoogleIcon from '@/components/ui/googleIcon';
import Button from '@/components/Button';

const Login = () => {
  const { setIsAuthenticated } = useAuthStore((state) => state);
  const { isLoading, mutateAsync: login, isError, error } = useLoginQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  useEffect(() => {
    if (isError) {
      toast.error(error as string, { theme: 'colored' });
    }
  }, [isError]);

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    console.log('🚀 ~ constonSubmit:SubmitHandler<LoginBody>= ~ data:', data);
    await login(data);
    setIsAuthenticated(true);
  };

  return (
    <section className="px-4 md:px-40 w-[45%] max-xl:w-full h-full mx-auto overflow-visible justify-center items-center">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center">
          <h1 className=" text-6xl md:text-6xl font-extrabold mt-10 md:mt-20 mb-5 md:mb-5 text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
            Connexion
          </h1>

          <div className="w-full flex items-center justify-center dark:bg-gray-800 mb-5">
            <UIButton className="w-full items-center justify-center h-10 px-4 py-1 border flex border-gray-300 dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
              <GoogleIcon />
              <span className="font-semibold text-black ">
                Login with Google
              </span>
            </UIButton>
          </div>
          <hr className="h-1 w-full mb-5 border-gray-300" />

          <form
            className="flex flex-col justify-between w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              htmlFor="notion-email-input"
              className="block mb-1 text-xs font-medium text-gray-500"
            >
              Email
            </label>
            <Input
              placeholder="Enter your email address..."
              errors={errors}
              type="email"
              autoComplete="email"
              aria-label="Enter your email address..."
              className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-400"
              name="email"
              register={register}
            />
            <label
              htmlFor="notion-email-input"
              className="block mb-1 text-xs font-medium text-gray-500"
            >
              Password
            </label>
            <Input
              placeholder="Enter your password ..."
              errors={errors}
              type="password"
              autoComplete="password"
              aria-label="Enter your password ..."
              className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-400"
              name="password"
              register={register}
            />
            <div className="text-gray-400 text-xs leading-tight mt-2 mb-4 text-left">
              Use an organization email to easily collaborate with teammates
            </div>
            <Button
              text="Continue"
              type="submit"
              isLoading={isLoading}
              className="w-full flex items-center justify-center h-10 rounded-md text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2 mb-4"
            />
          </form>
          <div className="w-full mt-12 mb-0 text-xs text-gray-400 text-center">
            <p className="mb-0">
              By continuing, you acknowledge that you understand and agree to
              the{' '}
              <a
                href="https://www.notion.so/Personal-Use-Terms-of-Service-00e4e5d0f2b9411cbee6493f15779500"
                rel="noopener noreferrer"
                className="inline text-gray-500 no-underline cursor-pointer"
              >
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a
                href="https://www.notion.so/3468d120cf614d4c9014c09f6adc9091"
                rel="noopener noreferrer"
                className="inline text-gray-500 no-underline cursor-pointer"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
