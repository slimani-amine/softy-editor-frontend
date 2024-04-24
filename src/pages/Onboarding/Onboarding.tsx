import Terms from '@/components/Authentication/Terms';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router';

const Onboarding = () => {
  const { user } = useAuthStore();
  console.log('🚀 ~ Onboarding ~ user:', user);

  return (
    <div className="h-full flex flex-col justify-center ">
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
            <Terms />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
