import React from 'react';
import GoogleIcon from '../../ui/googleIcon';
import { Button } from '@/components/ui/button';

const GoogleButton: React.FC = () => (
  <div className="w-full flex items-center justify-center dark:bg-gray-800 mb-5">
    <Button className="w-full items-center justify-center h-10 px-4 py-1 border flex border-gray-400 dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
      <GoogleIcon />
      <span className="font-semibold text-black ">Continue with Google</span>
    </Button>
  </div>
);

export default GoogleButton;
