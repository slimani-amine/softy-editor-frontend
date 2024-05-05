import { useState } from 'react';
import PricingFreeCard from './_components/PricingFreeCard';
import PricingPlusCard from './_components/PricingPlusCard';
import PricingBusinessCard from './_components/PricingBusinessCard';
import { User } from 'shared/types/user';
import useAuthStore from '@/store/useAuthStore';

type CardProps = {
  className?: string;
  user?: User | null;
};

const Pricing = ({ className, ...props }: CardProps) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>(
    'monthly',
  );

  const { myWorkspaces, user } = useAuthStore((state) => state);

  const handleSwitch = (period: 'monthly' | 'yearly') => {
    setBillingPeriod(period);
  };
  
  return (
    <section className="bg-white dark:bg-gray-900 scroll-smooth " id="pricing">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 flex flex-col items-center gap-4">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 flex flex-col items-center gap-4">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            One tool for your whole company. <br /> Free for teams to try.
          </h2>
          <div
            className="relative self-center bg-[#F6F5F4] rounded-2xl p-0.5 flex"
            id="switch"
          >
            <button
              type="button"
              onClick={() => handleSwitch('monthly')}
              className={`relative w-1/2 rounded-2xl py-2 text-sm font-bold whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${
                billingPeriod === 'monthly'
                  ? 'bg-white border-slate-50 text-slate-900 shadow-sm'
                  : 'border-transparent text-gray-400'
              } transition-colors duration-300`}
            >
              Pay monthly
            </button>
            <button
              type="button"
              onClick={() => handleSwitch('yearly')}
              className={`ml-0.5 relative w-1/2 border rounded-2xl py-2 text-sm font-bold whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 ${
                billingPeriod === 'yearly'
                  ? 'bg-white border-slate-50 text-slate-900 shadow-sm'
                  : 'border-transparent text-gray-400'
              } transition-colors duration-300`}
            >
              Pay yearly{' '}
              <span
                className={` ${
                  billingPeriod === 'yearly'
                    ? 'text-blue-400'
                    : ' text-gray-300'
                } transition-colors duration-300`}
              >
                save 20%
              </span>
            </button>
          </div>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          <PricingFreeCard
            billingPeriod={billingPeriod}
            offer={user?.offer}
            myWorkspaces={myWorkspaces}
          />
          <PricingPlusCard
            billingPeriod={billingPeriod}
            offer={user?.offer}
            myWorkspaces={myWorkspaces}
          />
          <PricingBusinessCard
            billingPeriod={billingPeriod}
            offer={user?.offer}
            myWorkspaces={myWorkspaces}
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
