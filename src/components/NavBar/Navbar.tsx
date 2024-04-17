'use client';

// import { useConvexAuth } from "convex/react";
// import { Button, UserButton } from "@clerk/clerk-react";

import { useScrollTop } from '@/hooks/use-scroll-top';
// import { ModeToggle } from "@/components/mode-toggle";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Spinner from '../Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import { Logo } from "./logo";

const Navbar = () => {
  // const { isAuthenticated, isLoading } = useConvexAuth();
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        'bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6'
        // scrolled && 'border-b shadow-sm'
      )}
    >
      {/* <Logo /> */}
      <Link to="/" className="flex items-center w-full">
        <span className="font-semibold text-gray-500 text-lg">
          Softy-Editor
        </span>
      </Link>
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2 font-semibold text-gray-500 text-lg">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <Button variant="ghost" size="sm">
              <Link to="/login" className="text-sm hover:text-black ">
                Log in
              </Link>
            </Button>
            <Button>
              <Link to="/" className="text-sm hover:text-black ">
                Get Softy-Editor free
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
