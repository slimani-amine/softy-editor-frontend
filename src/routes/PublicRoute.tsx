import { type ReactElement } from 'react';
import { Navigate } from 'react-router';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isAuthenticated } = useAuthStore((state) => state);
  console.log("🚀 ~ isAuthenticated:", isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PublicRoute;
