import { type ReactElement } from 'react';
import { Navigate } from 'react-router';
import useAuthStore from '@/store/useAuthStore';

interface Props {
  children: ReactElement;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  // Replace with your auth condition
  const { isAuthenticated, myWorkspaces } = useAuthStore((state) => state);
  console.log('🚀 ~ myWorkspaces:', myWorkspaces);

  return isAuthenticated ? (
    <Navigate to={`/workspaces/${myWorkspaces[0].id}/documents`} />
  ) : (
    children
  );
};

export default PublicRoute;
