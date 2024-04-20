import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

import { api } from '@/lib/api';
import LazyLoad from '@/components/Shared/LazyLoad';
import { clearTokens, getTokens } from '@/lib/utils/token';
import useAuthStore from '@/store/useAuthStore';
import useIsMountedRef from '@/hooks/useIsMountedRef';
const BASE_URL = import.meta.env['BASE_URL'] as string
interface AuthProviderProps {
  children: React.ReactNode;
}

interface JwtPayload {
  exp: number;
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const isMounted = useIsMountedRef();

  const { isInitialised, setUser, setIsAuthenticated } = useAuthStore();

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
        const user = response.data;
        console.log('🚀 ~ fetchUser ~ user:', user);
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
