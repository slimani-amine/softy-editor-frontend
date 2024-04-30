import CreateWorkspace from '@/components/Onboarding/CreateWorkspace';
import InviteMembers from '@/components/Onboarding/InviteMembers';
import PlanningToUse from '@/components/Onboarding/PlanningToUse';
import WelcomeProfileForm from '@/components/Onboarding/WelcomeProfile';
import Header from '@/components/Onboarding/WelcomeProfileHeader/WelcomeProfile';
import WelcomeIcon from '@/components/Shared/Icons/WelcomeIcon';
import useAuthStore from '@/store/useAuthStore';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

const Onboarding = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  if (!user) {
    navigate('/login');
  }

  const [isHaveProfile, setIsHaveProfile] = useState<boolean>(
    user.userName ? true : false
  );
  const [isHaveAPlan, setIsHaveAPlan] = useState<boolean>(
    user?.plan ? true : false
  );
  const [isHaveAWorkspace, setIsHaveAWorkspace] = useState<boolean>(
    user?.workspace ? true : false
  );

  return (
    <div className="h-full flex flex-col justify-center bg-[#F7F6F3] relative">
      <WelcomeIcon className="absolute bottom-2 left-7 w-[10.5rem]" />
      {!isHaveProfile ? (
        <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center  ">
          <div className="w-full  mx-auto flex flex-col gap-5 ">
            <Header
              title={'Welcome to E-ditor'}
              subTitle={' First things first, tell us a bit about yourself.'}
            />
            <WelcomeProfileForm
              user={user}
              setIsHaveProfile={setIsHaveProfile}
            />
          </div>
        </section>
      ) : !isHaveAPlan ? (
        <section className="px-4 w-full h-full m-auto overflow-visible flex flex-col justify-center  ">
          <div className="w-full  mx-auto flex flex-col gap-10 ">
            <Header
              title={'How are you planning to use Notion?'}
              subTitle={' We’ll streamline your setup experience accordingly.'}
            />
            <PlanningToUse user={user} setIsHaveAPlan={setIsHaveAPlan} />
          </div>
        </section>
      ) : !isHaveAWorkspace ? (
        <section className="px-4 w-[24rem] h-full m-auto overflow-visible flex flex-col justify-center ">
          <div className="w-full  mx-auto flex flex-col gap-10 ">
            <Header
              title={'Create a team workspace'}
              subTitle={
                ' Fill in some details for your teammates.             '
              }
            />
            <CreateWorkspace
              user={user}
              setIsHaveProfile={setIsHaveAWorkspace}
            />
          </div>
        </section>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Onboarding;
