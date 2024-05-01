import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useState } from 'react';
import Spinner from '@/components/Shared/Spinner';

const Navbar = () => {
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      className={cn(
        'bg-transparent dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6 z-50',
      )}
    >
      <Link to="/" className="flex items-center w-full">
        <span className="font-semibold text-gray-700 text-lg">
          Softy Editor{' '}
        </span>
      </Link>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 font-semibold text-gray-700 text-lg">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <Button  >
              <Link
                to="/login"
                className="text-lg text-white "
              >
                Log in
              </Link>
            </Button>
            <Button variant={'empty'}>
              <HashLink
                to="#pricing"
                className="text-lg text-black scroll-smooth"
              >
                pricing
              </HashLink>
            </Button>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <Button asChild>
              <Link to="/documents">Enter E-ditor</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
export default Navbar;
