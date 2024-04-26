import PlanningToUse from '@/components/Onboarding/PlanningToUse';
import WelcomeProfileForm from '@/components/Onboarding/WelcomeProfile';
import Header from '@/components/Onboarding/WelcomeProfileHeader/WelcomeProfile';
import { profileSchema } from '@/lib/validation';
import {
  useLoginQuery,
  useUpdateUserQuery,
} from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { ProfileBody } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Onboarding = () => {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileBody>({
    resolver: yupResolver(profileSchema),
  });

  const [isHaveProfile, setIsHaveProfile] = useState<boolean>(
    user.userName ? true : false
  );

  const [selectedFileUrl, setSelectedFileUrl] = useState<string>(user?.photo);
  const [selectedId, setSelectedId] = useState<number>(0);
  console.log('🚀 ~ Onboarding ~ selectedId:', selectedId);

  const {
    isLoading,
    mutateAsync: update,
    isError,
    error,
  }: any = useUpdateUserQuery();

  useEffect(() => {
    if (isError && error) {
      const errorMessage = error.response?.data?.errors;
      if (errorMessage?.userName) {
        toast.error('UserName Already Exists');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }, [isError, error]);

  const onSubmit: SubmitHandler<ProfileBody> = async (data) => {
    data.photo = selectedFileUrl;
    data.id = user.id;

    try {
      const res = await update(data);
      if (res) {
        toast.success('user Upadated successfully');
        setIsHaveProfile(true);
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="h-full flex flex-col justify-center bg-[#F7F6F3]">
      {!isHaveProfile ? (
        <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center  ">
          <div className="w-full  mx-auto flex flex-col gap-5 ">
            <Header
              title={'Welcome to E-ditor'}
              subTitle={' First things first, tell us a bit about yourself.'}
            />
            <WelcomeProfileForm
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              register={register}
              errors={errors}
              selectedFileUrl={selectedFileUrl}
              setSelectedFileUrl={setSelectedFileUrl}
              isLoading={isLoading}
              isValid={isValid}
            />
          </div>
        </section>
      ) : selectedId === 0 ? (
        <section className="px-4 w-full h-full m-auto overflow-visible flex flex-col justify-center  ">
          <div className="w-full  mx-auto flex flex-col gap-10 ">
            <Header
              title={'How are you planning to use Notion?'}
              subTitle={' We’ll streamline your setup experience accordingly.'}
            />
            <PlanningToUse
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </div>
        </section>
      ) : (
        <section className="px-4 w-full h-full m-auto overflow-visible flex flex-col justify-center  ">
          <div className="w-full  mx-auto flex flex-col gap-10 ">
            <Header
              title={'Create a team workspace'}
              subTitle={
                ' Fill in some details for your teammates.             '
              }
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default Onboarding;
