import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const OnboardingRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user, myWorkspaces } = useAuthStore(
    (state) => state,
  );
  console.log('🚀 ~ isAuthenticated:', myWorkspaces);
  console.log('🚀 ~ user:', user);

  if ((user && user.status.id === 2) || !myWorkspaces || myWorkspaces.length === 0) {
    return children;
  }
};

export default OnboardingRoute;
