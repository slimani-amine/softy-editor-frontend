import { ArrowRight } from 'lucide-react';

import { Button } from 'shared/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Spinner from 'shared/components/Shared/Spinner';

const Heading = () => {
  const [isAuthenticated, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold  ">
        Your Ideas, Documents, & Plans. Unified. <br /> Welcome to E-ditor
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        E-ditor is the connected workspace where <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild className="mt-4">
          <Link to="/documents" className="hover:text-black">
            Enter E-ditor
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <Link to="/login">
          <Button className=" mt-4">
            <p>Enter Now</p>
            <ArrowRight className="h-4 w-4 ml-2 " />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Heading;
