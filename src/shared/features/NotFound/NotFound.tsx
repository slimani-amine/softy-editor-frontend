import AuthNav from '@/components/AuthNav';
import NotFoundIcon from '@/components/Shared/Icons/NotFoundIcon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full flex justify-center items-center">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] z-50"></div>

      <AuthNav />

      <div className=" flex flex-col items-center dark:bg-[#1F1F1F] ">
        <div className="flex flex-col items-center justify-center md:justify-start text-cente gap-y-8 flex-1 ">
          <NotFoundIcon />
          <h1 className="text-gray-600">
            Oops! The page you are looking for could not be found.
          </h1>
          <Button
            onClick={() => navigate('/')}
            className=" inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 cursor-pointer z-50"
          >
            {' '}
            Go back to Home{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
