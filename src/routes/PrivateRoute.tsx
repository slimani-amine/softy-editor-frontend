import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore((state) => state);
  console.log('🚀 ~ user:', user);
  console.log('🚀 ~ isAuthenticated:', isAuthenticated);

  if (user && user.status.id === 2) {
    return <Navigate to="/onboarding" />;
  } else {
    return isAuthenticated ? children : <Navigate to="/" />;
  }
};

export default PrivateRoute;
