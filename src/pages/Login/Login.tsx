import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validation';
import { useLoginQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from '@/types/auth';
import toast from 'react-hot-toast';
import LoginForm from '../../components/Authentication/LoginForm/LoginForm';
import GoogleButton from '@/components/Authentication/GoogleButton';
import Terms from '@/components/Authentication/Terms';
import AuthNav from '@/components/Authentication/AuthNav';
import AppleButton from '@/components/Authentication/AppleButton';
import { generateUniqueCode } from '@/lib/utils/generateUniqueCode';
import { useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const { setIsAuthenticated, setUser } = useAuthStore((state) => state);

  const [searchParams] = useSearchParams();

  const [token, setToken] = useState(searchParams.get('token'));

  const hash = searchParams.get('token');

  const [showCode, setShowCode] = useState<boolean>(hash ? true : false);
  const decoded = hash && (jwtDecode(hash) as any);

  const [codeFromEmail, setCodeFromEmail] = useState<string | undefined>(
    decoded?.hash ? generateUniqueCode(decoded.hash) : undefined
  );

  const [email, setEmail] = useState<string | undefined>(decoded?.email);
  const defaultValues = { email: email, code: codeFromEmail };

  const {
    isLoading,
    mutateAsync: login,
    isError,
    error,
  }: any = useLoginQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  const resend = async (email: string) => {
    try {
      const res = await login({ email });
      if (res) {
        const { hash: token } = res;
        setShowCode(true);
        setToken(token);
      }
      toast.success('Code resent successfully.');
    } catch (error) {
      toast.error('Failed to resend code.');
    }
  };

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    if (!data.code) {
      setEmail(data.email);
      const res = await login(data);
      if (res) {
        const { hash: token } = res;
        setShowCode(true);
        setToken(token);
      }
    } else if (data.code && token) {
      const hash = jwtDecode(token) as any;

      const decode = generateUniqueCode(hash?.hash);
      if (data.code === decode) {
        toast.success('Perfect');
      } else {
        toast.error('code incorrect');
      }
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <AuthNav />
      <section className="px-4 w-[23rem] h-full m-auto overflow-visible flex flex-col justify-center z-10 mt-24 ">
        <div className="w-full  mx-auto flex flex-col gap-5 ">
          <div className="flex flex-col items-start mb-5 leading-3">
            <h1 className="text-2xl font-semibold text-center  max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Think it. Make it.
            </h1>
            <h2 className="text-[#acaba9] text-2xl font-semibold leading-3">
              Sign into your E-ditor account
            </h2>
          </div>
          <div className="flex flex-col items-center  ">
            <GoogleButton />
            <AppleButton />
            <hr className="h-1 w-full mb-4 mt-4 border-color" />
            <LoginForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              errors={errors}
              register={register}
              isLoading={isLoading}
              showCode={showCode}
              defaultValues={defaultValues}
              resend={resend} // Pass the resend function as a prop
            />
            <Terms />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
