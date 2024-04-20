import { create } from 'zustand';
import { logger } from './logger';
import { clearItem, setItem } from '../lib/localStorage';
 
interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
}
 
export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
  setUser: (args: AuthState['user']) => void;
  setToken: (args: string) => void;
  clearToken: () => void;
}
 
const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};
 
const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (isAuthenticated) => {
        set(() => ({ isAuthenticated }));
        set(() => ({ isInitialised: true }));
      },
 
      setToken: (token: string) => {
        setItem('token', token);
      },
      setUser: (user) => {
        set(() => ({ user }));
      },
      clearToken: () => {
        clearItem('token');
      },
    }),
    'authStore'
  )
);
 
export default useAuthStore;