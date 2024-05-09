import Button from 'shared/components/Shared/Button';
import Input from 'shared/components/Shared/Input';
import { LoginBody } from 'shared/types/auth';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import GoogleButton from '../GoogleButton';

interface LoginFormProps {
  isNewUser: boolean;
  onSubmit: SubmitHandler<LoginBody>; // Adjusted type
  isLoading: boolean;
  showCode: boolean;
  setShowCode: (value: boolean) => void;
  ShowPassword: boolean;
  forgotPassword: boolean;
  setForgotPassword: (value: boolean) => void;
  setShowPassword: (value: boolean) => void;
  mailSended: boolean;
  defaultValues: { email: string | undefined };
  resend: (email: string) => void;
  setSendMailLogin: (value: any) => void;
  allErrors: {
    loginError?: any;
    emailLoginError?: any;
    validationError?: string;
  };
  setAllErrors: (errors: {
    loginError?: any;
    emailLoginError?: any;
    validationError?: string;
  }) => void;
  isAnInvitation: boolean;
  emailInvitation: string;
}
export default function LoginForm({
  isNewUser,
  onSubmit,
  isLoading,
  showCode,
  setShowCode,
  ShowPassword,
  setShowPassword,
  forgotPassword,
  setForgotPassword,
  mailSended,
  defaultValues,
  resend,
  setSendMailLogin,
  allErrors,
  setAllErrors,
  isAnInvitation,
  emailInvitation,
}: LoginFormProps) {
  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [codeValue, setCodeValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const {
    register,
    handleSubmit,
    formState: { defaultValues: dValues },
  } = useForm<LoginBody>({
    defaultValues: {
      email:
      isAnInvitation && emailInvitation
      ? emailInvitation
      : defaultValues.email,
    },
    values: {
      email:
      isAnInvitation && emailInvitation
      ? emailInvitation
      : (defaultValues.email as string),
    },
  });
  const handleResendTimer = () => {
    let timer = 30;

    setResendTimer(timer);

    const timerInterval = setInterval(() => {
      timer -= 1;

      if (timer <= 0) {
        clearInterval(timerInterval);
        setIsResendDisabled(false);
        setResendTimer(null);
      } else {
        setResendTimer(timer);
      }
    }, 1000);
  };
  const resetErrors = () => {
    setAllErrors({});
  };

  useEffect(() => {
    if (isResendDisabled && showCode) {
      handleResendTimer();
    }
  }, [isResendDisabled, showCode]);

  return (
    <form
      className="flex flex-col justify-between w-full gap-4 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        {mailSended ? (
          <p className="text-lg text-[#37352F] font-light leading-6 text-center">
            Check your inbox for the link to reset your password.
          </p>
        ) : (
          <>
            <Input
              placeholder="Enter your email address..."
              type="email"
              label="Email"
              // defaultValue={defaultValues?.email || dValues?.email}
              // value={defaultValues?.email}
              autoComplete="email"
              aria-label="Enter your email address..."
              className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
              name="email"
              register={register}
              onChange={() => {
                if (showCode || ShowPassword) {
                  setShowCode(false);
                  setShowPassword(false);
                  setCodeValue('');
                  setPasswordValue('');
                  setSendMailLogin(false);
                }
                resetErrors();
              }}
              disabled={isAnInvitation}
            />
            <p className="text-sm text-[#ACABA9] font-light leading-4">
              Use an organization email to easily collaborate with teammates
            </p>
            {showCode && (
              <>
                <Input
                  placeholder={
                    isNewUser ? 'Paste signup code' : `Paste login code`
                  }
                  type="text"
                  label={isNewUser ? 'Signup code' : `Verification code`}
                  aria-label={
                    isNewUser ? 'Paste signup code' : `Paste verification code`
                  }
                  className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
                  name="code"
                  value={codeValue}
                  onChange={(e) => {
                    setCodeValue(e.target.value);
                    resetErrors();
                  }}
                  register={register}
                />
                <p className="text-xs text-[#ACABA9] font-light leading-4">
                  We sent a login code to your inbox ·{' '}
                  <span
                    className={` font-medium cursor-pointer ${
                      isResendDisabled
                        ? 'opacity-50 pointer-events-none text-[#ACABA9] text-xs'
                        : 'text-blue-500'
                    }`}
                    onClick={() => {
                      if (!isResendDisabled) {
                        resend(defaultValues?.email || '');
                        setIsResendDisabled(true);
                      }
                    }}
                  >
                    Resend {resendTimer ? `(${resendTimer})` : null}
                  </span>
                </p>
              </>
            )}
            {ShowPassword && !forgotPassword && (
              <>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  label="Password"
                  aria-label="Enter your password"
                  className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
                  name="password"
                  value={passwordValue}
                  onChange={(e) => {
                    setPasswordValue(e.target.value);
                    resetErrors();
                  }}
                  register={register}
                />
                <a
                  className="text-sm text-blue-500 font-semibold leading-4 cursor-pointer"
                  onClick={() => {
                    setForgotPassword(true);
                    setAllErrors({});
                  }}
                >
                  Forgot your password ?
                </a>
              </>
            )}
            <div className="flex flex-col justify-center items-center gap-1">
              <Button
                text={forgotPassword ? `Send reset link` : 'Continue'}
                type="submit"
                isLoading={isLoading}
                className="w-full flex items-center justify-center h-9 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2"
              />
            <GoogleButton />

              {allErrors.emailLoginError &&
                allErrors.emailLoginError.response?.data?.errors?.password && (
                  <span className="text-red-500">
                    {allErrors.emailLoginError.response.data.errors.password
                      .replace(/([A-Z])/g, ' $1')
                      .trim()}
                  </span>
                )}
              {allErrors.loginError &&
                allErrors.loginError.response?.data?.errors?.email && (
                  <span className="text-red-500">
                    {allErrors.emailLoginError.response.data.errors.email
                      .replace(/([A-Z])/g, ' $1')
                      .trim()}
                  </span>
                )}

              {allErrors.validationError && (
                <span className="text-red-500">
                  {allErrors.validationError}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </form>
  );
}
