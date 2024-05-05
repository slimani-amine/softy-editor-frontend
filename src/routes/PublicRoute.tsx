import { type ReactElement } from 'react';
import { Navigate } from 'react-router';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, myWorkspaces } = useAuthStore((state) => state);
  //TODO : add protected route for login
  return isAuthenticated && myWorkspaces && myWorkspaces.length > 0 ? (
    <Navigate to={`/workspaces/${myWorkspaces[0].id}/documents`} />
  ) : (
    children
  );
};

export default PublicRoute;
