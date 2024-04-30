import { useNavigate } from 'react-router';
import AppleIcon from '../../Shared/Icons/AppleIcon';
import { Button } from '@/components/ui/button';

const AppleButton: React.FC = () => {
  return (
    <a
      href="https://www.icloud.com"
      className="w-full flex items-center justify-center dark:bg-gray-800 mb-2"
    >
      <Button
        variant={'empty'}
        className="w-full items-center justify-center h-9 px-2 py-1 border flex border-color dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        onClick={() => {}}
      >
        <AppleIcon />
        <span className=" text-black ">Continue with Apple</span>
      </Button>
    </a>
  );
};

export default AppleButton;
