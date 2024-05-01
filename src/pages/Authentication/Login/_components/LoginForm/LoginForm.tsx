import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { LoginBody } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
}: any) {
  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [codeValue, setCodeValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const { register, handleSubmit } = useForm<LoginBody>();

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
              defaultValue={defaultValues?.email}
              autoComplete="email"
              aria-label="Enter your email address..."
              className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-2 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
              name="email"
              register={register}
              onChange={() => {
                if (showCode || ShowPassword) {
                  setShowCode();
                  setShowPassword();
                  setCodeValue('');
                  setPasswordValue('');
                  setSendMailLogin(false);
                }
                resetErrors();
              }}
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
                  label={isNewUser ? 'Signup code' : `Login code`}
                  aria-label={
                    isNewUser ? 'Paste signup code' : `Paste login code`
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
                <p className="text-sm text-[#ACABA9] font-light leading-4">
                  We sent a login code to your inbox ·{' '}
                  <span
                    className={` font-medium cursor-pointer ${
                      isResendDisabled
                        ? 'opacity-50 pointer-events-none text-[#ACABA9] text-sm'
                        : 'text-blue-500'
                    }`}
                    onClick={() => {
                      if (!isResendDisabled) {
                        resend(defaultValues.email);
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
              {allErrors.emailLoginError &&
                allErrors.emailLoginError.response?.data?.errors?.password && (
                  <span className="text-red-500">
                    {allErrors.emailLoginError.response.data.errors.password}
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
