import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const OnboardingRoute: React.FC<Props> = ({ children }) => {
  const { user, myWorkspaces } = useAuthStore((state) => state);

<<<<<<< HEAD
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    (user && user?.status?.id === 2) ||
=======
  if (
    (user && user.status && user.status.id === 2) ||
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
    !myWorkspaces ||
    myWorkspaces.length === 0
  ) {
    return children;
  } else {
    return <Navigate to="/pricing" />;
  }
};

export default OnboardingRoute;
