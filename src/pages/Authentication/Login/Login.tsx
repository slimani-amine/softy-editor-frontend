import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import {
  useEmailLoginQuery,
  useLoginQuery,
  useSendMailQuery,
} from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { LoginBody } from 'shared/types/auth';
import toast from 'react-hot-toast';
import LoginForm from './_components/LoginForm/LoginForm';
import AuthNav from 'shared/components/AuthNav';
import { generateUniqueCode } from '@/lib/utils/generateUniqueCode';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setTokens } from '@/lib/utils/token';
import { useGetMyWorkSpacesQuery } from '@/services/queries/workspace.query';
import GoogleButton from './_components/GoogleButton';
import AppleButton from './_components/AppleButton';
import SingleAuthButton from './_components/SingleAuthButton';
import Terms from './_components/Terms';

const Login = () => {
  const { setIsAuthenticated, setUser, user, myWorkspaces, setMyWorkspaces } =
    useAuthStore((state) => state);
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [isNewUser, setIseNewUser] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const [forgotPassword, setForgotPassword] = useState<boolean>(false);
  const [mailSended, setMailSended] = useState<boolean>(false);
  const [sendMailLogin, setSendMailLogin] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>();
  const [allErrors, setAllErrors] = useState<any>({});

  const defaultValues = { email: email };

  const navigate = useNavigate();

  const { isLoading, mutateAsync: login, isError, error } = useLoginQuery();
  const {
    isLoading: emailLoginLoading,
    mutateAsync: emailLogin,
    isError: isErrorForEmailLogin,
    error: errorForEmailLogin,
  } = useEmailLoginQuery();

  const {
    isLoading: sendMailLoginLoading,
    mutateAsync: sendMail,
    isError: isErrorForSendMail,
    error: errorForSendMail,
  } = useSendMailQuery();

  const {
    isLoading: getMyWorkspacesLoading,
    mutateAsync: getMyWorkspaces,
    isError: isErrorForGetMyWorkspaces,
    error: errorForGetMyWorkspaces,
  } = useGetMyWorkSpacesQuery();

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
    if (forgotPassword) {
      // If user is trying to reset password, send mail
      await sendMail(data);
      setMailSended(true);
    }
    if (data.email && !sendMailLogin) {
      // If email is provided and not already sent mail login
      setEmail(data.email);
      const res = await login(data);
      if (res) {
        const { user } = res;
        if (
          user.provider === 'email' &&
          (user?.status?.id === 1 || user?.plan?.id)
        ) {
          // If user's status is active or has a plan, show password input
          setShowPassword(true);
        } else if (user.provider === 'email' && user.status.id === 2) {
          // If user is new and signed up with email, show verification code input
          const { token: accessToken, refreshToken } = res;
          setIseNewUser(true);
          setShowCode(true);
          setUser(user);
          setRefreshToken(refreshToken);
          setToken(accessToken);
        } else {
          // If user is neither new nor active, show verification code input
          const { token: accessToken, refreshToken } = res;
          setShowCode(true);
          setUser(user);
          setRefreshToken(refreshToken);
          setToken(accessToken);
        }
      }
      setSendMailLogin(true);
    } else if (data.code && token) {
      // If verification code is provided and token exists
      if (data.code.length !== 19) {
        // Check if code length is valid
        setAllErrors({ ...allErrors, validationError: 'Code invalid' });
      }
      const hash = jwtDecode(token) as any;
      const decode = generateUniqueCode(hash.hash);
      if (data.code === decode) {
        // If verification code is correct
        if (user?.status?.id === 2) {
          // If user is new, navigate to onboarding
          setTokens(token, refreshToken);
          setToken(token);
          setIsAuthenticated(true);
          navigate('/onboarding');
        } else {
          // If user is not new, fetch workspaces and navigate to the first workspace's documents page
          setTokens(token, refreshToken);
          setToken(token);
          setIsAuthenticated(true);
          const myWorkspaces = await getMyWorkspaces(token);
          if (myWorkspaces) {
            setMyWorkspaces(myWorkspaces);
            navigate(`/workspaces/${myWorkspaces[0]?.id}/documents`);
          } else {
            navigate('/onboarding');
          }
        }
      } else {
        // If verification code is incorrect, show error
        setAllErrors({ ...allErrors, validationError: 'Code invalid' });
      }
    } else if (data.password) {
      // If password is provided, attempt email login
      const res = await emailLogin({
        email: data.email,
        password: data.password,
      });
      const { token: accessToken, refreshToken, user } = res;
      setTokens(accessToken, refreshToken);
      setToken(token);
      setUser(user);
      const myWorkspaces = await getMyWorkspaces(accessToken);
      setIsAuthenticated(true);
      if (myWorkspaces && myWorkspaces.length > 0) {
        // If user has workspaces, navigate to the first workspace's documents page
        setMyWorkspaces(myWorkspaces);
        navigate(`/workspaces/${myWorkspaces[0]?.id}/documents`);
      } else {
        // If user has no workspaces, navigate to onboarding
        navigate('/onboarding');
      }
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
              isNewUser={isNewUser}
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
