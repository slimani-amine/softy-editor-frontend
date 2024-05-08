import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, user, myWorkspaces } = useAuthStore(
    (state) => state,
  );
  console.log(myWorkspaces);

  if (
    (user && user?.status?.id === 2) ||
    !myWorkspaces ||
    myWorkspaces.length === 0
  ) {
    return <Navigate to="/onboarding" />;
  } else {
    return isAuthenticated ? children : <Navigate to="/" />;
  }
};

export default PrivateRoute;
