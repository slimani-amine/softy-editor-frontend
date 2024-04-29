import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
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
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setTokens } from '@/lib/utils/token';
import SingleAuthButton from '@/components/Authentication/SingleAuthButton';

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
  const [allErrors, setAllErrors] = useState<any>({});

  const defaultValues = { email: email };

  const navigate = useNavigate();
  const {
    isLoading,
    mutateAsync: login,
    isError,
    error,
  }: any = useLoginQuery();

  const {
    isLoading: emailLoginLoading,
    mutateAsync: emailLogin,
    isError: isErrorForEmailLogin,
    error: errorForEmailLogin,
  }: any = useEmailLoginQuery();

  const {
    isLoading: sendMailLoginLoading,
    mutateAsync: sendMail,
    isError: isErrorForSendMail,
    error: errorForSendMail,
  }: any = useSendMailQuery();

  useEffect(() => {
    const errors = {
      loginError: error,
      emailLoginError: errorForEmailLogin,
      sendMailError: errorForSendMail,
    };
    setAllErrors(errors);
  }, [isError, isErrorForEmailLogin, isErrorForSendMail]);

  const resend = async (email: string) => {
    try {
      const res = await login({ email });
      if (res) {
        const { token: accessToken, refreshToken } = res;
        setShowCode(true);
        setRefreshToken(refreshToken);
        setToken(accessToken);
      }
    } catch (error) {
      toast.error('Failed to resend code.');
    }
  };

  const onSubmit: SubmitHandler<LoginBody> = async (data) => {
    if (!data.email) {
      setAllErrors({ ...allErrors, validationError: 'Email is required' });
    }
    if (forgotPassword) {
      await sendMail(data);
      setMailSended(true);
    }
    if (data.email && !sendMailLogin) {
      setEmail(data.email);
      const res = await login(data);
      if (res) {
        const { user } = res;
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
      if (data.code.length !== 19) {
        setAllErrors({ ...allErrors, validationError: 'Code invalid' });
      }
      const hash = jwtDecode(token) as any;
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
        setAllErrors({ ...allErrors, validationError: 'Code invalid' });
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
      <section className="px-4 w-[22.5rem] h-full m-auto overflow-visible flex flex-col justify-center mt-16 ">
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
            <SingleAuthButton />
            <hr className="h-1 w-full mb-4 mt-4 border-color" />
            <LoginForm
              onSubmit={onSubmit}
              isError={allErrors.loginError}
              error={allErrors.loginError}
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
              allErrors={allErrors}
              setAllErrors={setAllErrors}
            />
            <Terms className="w-full text-xs text-[#62615c] text-center mt-16 font-normal" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
