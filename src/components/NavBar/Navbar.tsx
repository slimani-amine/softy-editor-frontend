import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div
      className={cn(
        'bg-background dark:bg-[#191919] fixed top-0 flex items-center w-full p-6',
      )}
    >
      <a href="#" className="flex items-center w-full">
        <span className="font-semibold text-gray-500 text-lg">
          Softy-Editor
        </span>
      </a>
      <>
        <Button className="hover:opacity-90 ">
          <Link to="/login" className="text-sm  ">
            Log in
          </Link>
        </Button>
      </>
    </div>
  );
};
export default Navbar;
