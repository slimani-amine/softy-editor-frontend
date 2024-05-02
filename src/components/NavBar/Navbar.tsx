import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Spinner from '../Shared/Spinner';
const Navbar = () => {
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 font-semibold text-gray-500 text-lg">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <Button className="hover:opacity-90 ">
              <Link to="/login" className="text-sm  ">
                Log in
              </Link>
            </Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/documents">Enter Softy-Editor</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
