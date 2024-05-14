import { Button } from 'shared/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Logo from 'shared/components/Shared/Icons/Logo';

const Navbar = () => {
  return (
    <div
      className={cn(
        'bg-transparent dark:bg-transparent fixed top-0 flex items-center w-full px-6 z-50',
      )}
    >
      <Link to="/">
        <Logo />
      </Link>
      <div className="justify-end w-full flex items-center gap-x-2 font-semibold text-gray-700 text-lg">
        <Button variant={'empty'}>
          <Link to="/login" className="text-lg text-black dark:text-white">
            Log in
          </Link>
        </Button>
      </div>
    </div>
  );
};
export default Navbar;
