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
import FreeIcon from '@/components/Shared/Icons/FreeIcon';
import { useNavigate } from 'react-router';

interface Detail {
  title: string;
  description: string;
}

const details: Detail[] = [
  {
    title: 'Collaborative workspace.',
    description: '1 hour ago',
  },
  {
    title: 'Integrate with Slack, GitHub & more',
    description: '1 hour ago',
  },
  {
    title: 'Basic page analytics',
    description: '2 hours ago',
  },
  {
    title: '7 day page history',
    description: '2 hours ago',
  },
  {
    title: 'Invite 10 guests',
    description: '2 hours ago',
  },
];

interface PricingFreeCardProps {
  className?: string;
  billingPeriod: 'monthly' | 'yearly';
}

const PricingFreeCard: React.FC<PricingFreeCardProps> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <Card
      className={cn(
        'w-[380px] bg-[#F6F5F4] flex flex-col rounded-2xl border-none ',
        className,
      )}
    >
      <CardHeader className="flex flex-col ml-4">
        <FreeIcon className="w-10 h-10" />

        <CardTitle>Free</CardTitle>
        <CardTitle className="text-3xl">$0</CardTitle>
      </CardHeader>
      <Button
        className=" bg-white text-black flex justify-center w-[80%] mx-auto rounded-[7px] font-semibold hover:opacity-80 shadow-sm"
        onClick={() => navigate('/login')}
      >
        Sign Up
      </Button>
      <CardContent className="grid gap-2 mt-4 ml-8">
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
export default PricingFreeCard;
