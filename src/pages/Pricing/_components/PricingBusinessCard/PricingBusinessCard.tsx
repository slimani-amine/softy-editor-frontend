import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router';
import BuisnessIcon from '@/components/Shared/Icons/BuisnessIcon';

interface Detail {
  title: string;
  description: string;
}

interface PricingBusinessCardProps {
  className?: string;
  billingPeriod: 'monthly' | 'yearly';
}

const details: Detail[] = [
  {
    title: 'SAML SSO',
    description: '1 hour ago',
  },
  {
    title: 'Private teamspaces',
    description: '1 hour ago',
  },
  {
    title: 'Bulk PDF export',
    description: '2 hours ago',
  },
  {
    title: 'Advanced page analytics',
    description: '2 hours ago',
  },
  {
    title: '90 day page history',
    description: '2 hours ago',
  },
  {
    title: 'Invite 250 guests',
    description: '2 hours ago',
  },
];

const PricingBusinessCard: React.FC<PricingBusinessCardProps> = ({
  className,
  billingPeriod,
}) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(`/login?plan=business&billingPeriod=${billingPeriod}`);
  };

  return (
    <Card
      className={cn(
        'w-[380px] bg-[#F6F5F4] flex flex-col  rounded-2xl border-none',
        className,
      )}
    >
      <CardHeader className="flex flex-col ml-4">
        <BuisnessIcon className="w-10 h-10" />

        <CardTitle>Business</CardTitle>
        <CardTitle className="text-3xl">
          ${billingPeriod === 'monthly' ? '18' : '15'}{' '}
          <span className="text-lg">per seat/month</span>
        </CardTitle>
      </CardHeader>
      <Button
        className=" bg-white text-black  flex justify-center w-[80%] mx-auto rounded-[7px] font-semibold hover:opacity-80 shadow-sm "
        onClick={handleGetStarted}
      >
        Get started
      </Button>
      <CardContent className="grid gap-2 mt-4 ml-8">
        <span className="font-semibold">Everything in Plus +</span>

        {details.map((detail, index) => (
          <div
            key={index}
            className=" grid grid-cols-[25px_1fr] items-start  last:mb-0 last:pb-0 "
          >
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-black mt-1" />
            <div className="space-y-1">
              <p className="text-md ">{detail.title}</p>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
export default PricingBusinessCard;
