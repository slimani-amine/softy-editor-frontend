import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const OnboardingRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  console.log('🚀 ~ isAuthenticated:', isAuthenticated);
  console.log('🚀 ~ user:', user);

  if (user && user.status.id === 2) {
    return children;
  }
  // <Navigate to="/" />;
};

export default OnboardingRoute;
