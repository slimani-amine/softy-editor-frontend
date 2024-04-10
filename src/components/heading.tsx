'use client';

// import { useConvexAuth } from "convex/react";
import { ArrowRight } from 'lucide-react';
// import { SignInButton } from "@clerk/clerk-react";
// import Link from "next/link";

import { Button } from '@/components/ui/button';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { Spinner } from "@/components/spinner";

export const Heading = () => {
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold  ">
        Your Ideas, Documents, & Plans. Unified. Welcome to{' '}
        <span className=" animate-pulse">Softy-Editor</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Softy-Editor is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link to="/documents" className="hover:text-black">
            Enter Softy-Editor
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <Link to="/login">
          <Button className="hover:text-red-500 ">
            <p className="animate-typing border-r-4 border-r-white overflow-hidden whitespace-nowrap">
              Enter Now
            </p>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      )}
    </div>
  );
};
