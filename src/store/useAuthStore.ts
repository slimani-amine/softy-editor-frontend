import { create } from 'zustand';
import Cookies from 'universal-cookie';
import { logger } from './logger';

interface AuthState {
  isAuthenticated: boolean;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
}

const cookies = new Cookies();

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: cookies.get('isAuthenticated') === 'true',
};

const useAuthStore = create<AuthStore>()(
  logger<AuthStore>(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (isAuthenticated) => {
        set(() => ({ isAuthenticated }));
        cookies.set('isAuthenticated', isAuthenticated ? 'true' : 'false', { path: '/' });
      },
    }),
    'authStore'
  )
);

export default useAuthStore;
