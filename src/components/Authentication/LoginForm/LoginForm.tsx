import Button from '@/components/Shared/Button';
import Input from '@/components/Shared/Input';
import { useEffect, useState } from 'react';

export default function LoginForm({
  handleSubmit,
  onSubmit,
  errors,
  register,
  isLoading,
  showCode,
  defaultValues,
  resend,
}: any) {
  const [resendTimer, setResendTimer] = useState<number | null>(null);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const handleResendTimer = () => {
    setResendTimer(30);

    const timerInterval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(timerInterval); // Clear the interval when timer reaches 1
          setIsResendDisabled(false); // Enable the resend button
          return null;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (showCode) {
      handleResendTimer();
      setIsResendDisabled(true);
    }
  }, [showCode]);

  return (
    <form
      className="flex flex-col justify-between w-full gap-4 mb-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <Input
          placeholder="Enter your email address..."
          type="email"
          label="Email"
          defaultValue={defaultValues?.email}
          autoComplete="email"
          aria-label="Enter your email address..."
          className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-4 py-1 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
          name="email"
          register={register}
        />
        <p className="text-sm text-[#ACABA9] font-light leading-4">
          Use an organization email to easily collaborate with teammates
        </p>
        {showCode && (
          <>
            <Input
              placeholder="Paste login code"
              type="text"
              label="Login code"
              aria-label="Paste login code"
              className="w-full outline-none border border-gray-200 h-9 rounded-[5px] px-4 py-1 placeholder:text-gray-400 placeholder:bg-[#FFFEFC]"
              name="code"
              defaultValue={defaultValues?.code}
              register={register}
            />
            <p className="text-sm text-[#ACABA9] font-light leading-4">
              We sent a login code to your inbox ·{' '}
              <span
                className={`text-md text-blue-500 font-medium cursor-pointer ${
                  isResendDisabled && 'opacity-50 pointer-events-none'
                }`}
                onClick={() => {
                  if (!isResendDisabled) {
                    resend(defaultValues.email); // Call the resend function when clicked
                    handleResendTimer(); // Restart the timer
                    setIsResendDisabled(true); // Disable the resend span
                  }
                }}
              >
                Resend {resendTimer ? `(${resendTimer})` : null}
              </span>
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col justify-center items-center gap-1">
        <Button
          text="Continue"
          type="submit"
          isLoading={isLoading}
          className="w-full flex items-center justify-center h-9 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2"
        />
        {errors && errors && (
          <span className="text-red-500">
            {errors?.email?.message
              ? errors?.email?.message
              : (errors?.code?.message as string)}
          </span>
        )}
      </div>
    </form>
  );
}
