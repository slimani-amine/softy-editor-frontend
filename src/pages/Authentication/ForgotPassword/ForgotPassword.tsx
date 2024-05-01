import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Input from '@/components/Shared/Input/Input';
import { SendMailSchema } from '@/lib/validation';
import { useSendMailQuery } from '@/services/queries/auth.query';
import { SendMailBody } from '@/types/auth';
import Button from '@/components/Shared/Button';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ForgotPasswordIcon from '@/components/Shared/Icons/ForgotPasswordIcon';
import AuthNav from '@/components/AuthNav';
import GoogleButton from '../Login/_components/GoogleButton';
import AppleButton from '../Login/_components/AppleButton';
import Terms from '../Login/_components/Terms';


const ForgotPassword = () => {
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

  const onSubmit: SubmitHandler<SendMailBody> = async (data) => {
    try {
      await sendMail(data);
      setEmail(data.email);
      setButtonLabel('Resend');
      setRemainingSeconds(60);
      toast.success('An email has been sent. Please check your inbox.');
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  const handleResend = async () => {
    try {
      await sendMail({ email });
      setButtonLabel('Resend');
      setRemainingSeconds(60);
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="h-full flex flex-col justify-center ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <AuthNav />

      <section className="px-4 md:px-40 w-[50%] max-xl:w-full h-full mx-auto overflow-visible flex flex-col justify-center items-center z-10">
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-5 bg-white p-10 shadow-2xl rounded-2xl">
          <div className="flex flex-col items-start">
            <h1 className=" text-2xl font-extrabold text-center leading-tight max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl">
              Forgot Your Password?
            </h1>
            <h2 className="text-gray-500 text-xl font-semibold">
              Continue Creating with E-ditor
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
                    className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                    name="email"
                    register={register}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-1">
                <Button
                  text={`${buttonLabel} ${
                    buttonLabel === 'Resend' && remainingSeconds > 0
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
          <div className="flex justify-center items-center">
            <ForgotPasswordIcon />
          </div>
        </div>
      </section>
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
              <Input
                placeholder="Enter your email address..."
                label="Email"
                errors={errors}
                type="email"
                autoComplete="email"
                aria-label="Enter your email address..."
                className="w-full outline-none border border-gray-200 rounded-[5px] px-4 py-1 placeholder:text-gray-500"
                name="email"
                register={register}
              />
              <Terms className="" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ForgotPassword;
