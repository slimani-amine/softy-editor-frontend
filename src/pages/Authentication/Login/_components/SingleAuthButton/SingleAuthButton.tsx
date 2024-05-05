import SingleAuthIcon from 'shared/components/Shared/Icons/SingleAuthIcon';
import { Button } from 'shared/components/ui/button';

const SingleAuthButton: React.FC = () => {
  return (
    <a
      href="https://auth0.com/docs/authenticate/single-sign-on"
      className="w-full flex items-center justify-center dark:bg-gray-800 mb-2"
    >
      <Button
        variant={'empty'}
        className="w-full items-center justify-center h-9 px-2 py-1 border flex border-color dark:border-slate-700 rounded-[5px] text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      >
        <SingleAuthIcon />
        <span className=" text-black ">Single sign-on (SSO)</span>
      </Button>
    </a>
  );
};

export default SingleAuthButton;
