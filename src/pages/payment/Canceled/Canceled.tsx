import AuthNav from 'shared/components/AuthNav';
import NotFoundIcon from 'shared/components/Shared/Icons/NotFoundIcon';
import {  Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const Canceled = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex justify-center items-center ">
      <AuthNav />

      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 ">
        <NotFoundIcon />
        <h1 className="text-gray-600 text-xl md:text-3xl">Oops! Payment was cancelled.</h1>

        <div
          className="flex gap-1 items-center text-sm font-normal text-[#949493] pl-2 mt-2 cursor-pointer hover:bg-gray-200 px-2 py-1 hover:rounded-[4px]"
          onClick={() => navigate('/')}
        >
          <Undo2 className=" w-5 h-5" /> Go back
        </div>
      </div>
    </div>
  );
};

export default Canceled;
