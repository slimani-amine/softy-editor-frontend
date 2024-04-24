import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validation';
import {
  useEmailLoginQuery,
  useLoginQuery,
  useSendMailQuery,
} from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from '@/types/auth';
import toast from 'react-hot-toast';
import LoginForm from '../../components/Authentication/LoginForm/LoginForm';
import GoogleButton from '@/components/Authentication/GoogleButton';
import Terms from '@/components/Authentication/Terms';
import AuthNav from '@/components/Authentication/AuthNav';
import AppleButton from '@/components/Authentication/AppleButton';
import { generateUniqueCode } from '@/lib/utils/generateUniqueCode';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setTokens } from '@/lib/utils/token';

const Login = () => {
  const { setIsAuthenticated, setUser, user } = useAuthStore((state) => state);
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [showCode, setShowCode] = useState<boolean>();
  const [ShowPassword, setShowPassword] = useState<boolean>();
  const [forgotPassword, setForgotPassword] = useState<boolean>();
  const [mailSended, setMailSended] = useState<boolean>();
  const [sendMailLogin, setSendMailLogin] = useState<boolean>();

  const [email, setEmail] = useState<string | undefined>();
  const defaultValues = { email: email };

  const navigate = useNavigate();

  const {
    isLoading,
    mutateAsync: login,
    isError,
    error,
  }: any = useLoginQuery();

  const { isLoading: emailLoginLoading, mutateAsync: emailLogin }: any =
    useEmailLoginQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginBody>({ resolver: yupResolver(loginSchema) });

  const resend = async (email: string) => {
    try {
      const res = await login({ email });
      if (res) {
        const { token: accessToken, refreshToken } = res;
        setShowCode(true);
        setRefreshToken(refreshToken);
        setToken(accessToken);
      }
      toast.success('Code resent successfully.');
    } catch (error) {
      toast.error('Failed to resend code.');
    }
  };
  const { isLoading: sendMailLoginLoading, mutateAsync: sendMail }: any =
    useSendMailQuery();

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    if (forgotPassword) {
      await sendMail(data);
      setMailSended(true);
    }
    if (data.email && !sendMailLogin) {
      setEmail(data.email);
      const res = await login(data);
      if (res) {
        const { user } = res;
        console.log(
          '🚀 ~ constonSubmit:SubmitHandler<LoginBody>= ~ user:',
          user
        );
        if (user.provider === 'email' && user.status.id === 1) {
          setShowPassword(true);
        } else {
          const { token: accessToken, refreshToken } = res;
          setShowCode(true);
          setUser(user);
          setRefreshToken(refreshToken);
          setToken(accessToken);
        }
      }
      setSendMailLogin(true);
    } else if (data.code && token) {
      const hash = jwtDecode(token) as any;
      console.log('🚀 ~ constonSubmit:SubmitHandler<LoginBody>= ~ hash:', hash);
      const decode = generateUniqueCode(hash.hash);
      if (data.code === decode) {
        if (user.status.id === 2) {
          setTokens(token, refreshToken);
          setIsAuthenticated(true);
          navigate('/onboarding');
        } else {
          setTokens(token, refreshToken);
          setIsAuthenticated(true);
          navigate('/articles');
        }
      } else {
        toast.error('code incorrect');
      }
    } else if (data.password) {
      const res = await emailLogin({
        email: data.email,
        password: data.password,
      });
      const { token: accessToken, refreshToken, user } = res;
      setTokens(accessToken, refreshToken);
      setUser(user);
      setIsAuthenticated(true);
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
              isLoading={isLoading || emailLoginLoading || sendMailLoginLoading}
              showCode={showCode}
              setShowCode={setShowCode}
              ShowPassword={ShowPassword}
              setShowPassword={setShowPassword}
              forgotPassword={forgotPassword}
              setForgotPassword={setForgotPassword}
              mailSended={mailSended}
              defaultValues={defaultValues}
              resend={resend}
              setSendMailLogin={setSendMailLogin}
            />
            <Terms />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
