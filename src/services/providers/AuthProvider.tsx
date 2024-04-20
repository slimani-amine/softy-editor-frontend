import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
 
import useIsMountedRef from '../hook/useIsMountedRef';
import useAuthStore from '../../shared/store/useAuthStore';
import LazyLoad from '../../shared/components/LazyLoad';

import { api } from '@/lib/api';
 
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
        const response = await api.get('/auth/me');
        const user = response.data;
        setIsAuthenticated(true);
        setUser(user);
      } else {
        setIsAuthenticated(false);
        clearTokens();
      }
    }
 
    fetchUser();
  }, []);
 
  if(!isInitialised){
    return <LazyLoad/>
  }
  return <>{children}</>;
};
 
export default AuthProvider;