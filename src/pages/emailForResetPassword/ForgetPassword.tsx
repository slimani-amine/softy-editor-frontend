import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Input/Input';
import { SendMailSchema } from '@/lib/validation';
import { useSendMailQuery } from '@/services/queries/auth.query';
import { SendMailBody } from '@/types/auth';
import Button from '@/components/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const {
    isLoading,
    mutateAsync: sendMail,
    isError,
    error,
  } = useSendMailQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendMailBody>({
    resolver: yupResolver(SendMailSchema),
  });

  const [buttonLabel, setButtonLabel] = useState('Continue');
  const [email, setEmail] = useState('');
  const [remainingSeconds, setRemainingSeconds] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (buttonLabel === 'Resend' && remainingSeconds > 0) {
      timer = setTimeout(() => {
        setRemainingSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (buttonLabel !== 'Resend' && remainingSeconds === 0) {
      setButtonLabel('Resend');
      setRemainingSeconds(60);
    }
    return () => clearTimeout(timer);
  }, [buttonLabel, remainingSeconds]);

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      if (errorMessage?.email) {
        toast.error('Email not found');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError, error]);

  const onSubmit: SubmitHandler<SendMailBody> = async (data) => {
    try {
      await sendMail(data);
      setEmail(data.email);
      setButtonLabel('Resend');
      setRemainingSeconds(60);
      toast.success('Email sent successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      await sendMail({ email });
      setButtonLabel('Resend');
      setRemainingSeconds(60);
      toast.success('Email resend successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <div
        className={
          'bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6'
        }
      >
        <Link to="/" className="flex items-center w-full">
          <span className="font-semibold text-gray-500 text-lg">
            Softy-Editor
          </span>
        </Link>
      </div>
      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible justify-center items-center mt-20">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Think it. Make it.
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Sign into your Softy-Editor account
            </h2>
          </div>
          <div className="flex flex-col items-center">
            <form
              className="flex flex-col justify-between w-full gap-4 mb-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
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
                    className="w-full outline-none border border-gray-300 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                    name="email"
                    register={register}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <Button
                  text={`${buttonLabel} ${
                    buttonLabel === 'Resend'
                      ? `(${remainingSeconds} seconds)`
                      : ''
                  }`}
                  type="submit"
                  isLoading={isLoading}
                  onClick={buttonLabel === 'Resend' ? handleResend : undefined}
                  disabled={
                    isLoading ||
                    (buttonLabel === 'Resend' && remainingSeconds > 0)
                  }
                  className={`w-full flex items-center justify-center h-10 rounded-[5px] text-white text-sm font-medium bg-blue-500 hover:bg-blue-600 shadow-inner md:shadow-md mt-2`}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
