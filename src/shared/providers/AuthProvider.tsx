import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { api } from '@/lib/api';
import LazyLoad from 'shared/components/Shared/LazyLoad';
import { clearTokens, getTokens } from '@/lib/utils/token';
import useAuthStore from '@/store/useAuthStore';
import useIsMountedRef from 'shared/hooks/useIsMountedRef';
import { BASE_URL } from 'shared/config';
import { useGetMyWorkSpacesWithTokenQuery } from '@/services/queries/workspace.query';
interface AuthProviderProps {
  children: React.ReactNode;
}

interface JwtPayload {
  exp: number;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef();
  const {
    isLoading: getMyWorkspacesLoading,
    mutateAsync: getMyWorkspaces,
    isError: isErrorForGetMyWorkspaces,
    error: errorForGetMyWorkspaces,
  } = useGetMyWorkSpacesWithTokenQuery();

  const { isInitialised, setUser, setIsAuthenticated, setMyWorkspaces } =
    useAuthStore();

  const isValidToken = (token: string) => {
    const decoded: JwtPayload = jwtDecode(token);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
  };

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    async function fetchUser() {
      const { access_token } = getTokens();
      if (access_token && isValidToken(access_token)) {
        const response = await api.get(`${BASE_URL}/auth/me`);
        const user = response?.data;
        const myWorkspaces = await getMyWorkspaces(access_token);

        if (myWorkspaces) {
          setMyWorkspaces(myWorkspaces);
        }
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        clearTokens();
      }
    }

    fetchUser();
  }, []);

  if (!isInitialised) {
    return <LazyLoad />;
  }
  return <>{children}</>;
};

export default AuthProvider;
