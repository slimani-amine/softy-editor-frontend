import { create } from 'zustand';
import { logger } from './logger';
import { clearItem, setItem } from '../lib/localStorage';
import { WorkspaceBoxInNavigationPropsType } from '@/types/Propstypes';
import { User } from '@/types/user';

interface AuthState {
  isInitialised: boolean;
  isAuthenticated: boolean;
  user: User | null;
  myWorkspaces: any | null;
}

export interface AuthStore extends AuthState {
  setIsAuthenticated: (args: AuthState['isAuthenticated']) => void;
  setUser: (args: AuthState['user']) => void;
  setToken: (args: string) => void;
  setMyWorkspaces: (args: WorkspaceBoxInNavigationPropsType[]) => void;
  clearToken: () => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
  myWorkspaces: null,
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
      setMyWorkspaces: (myWorkspaces: any) => {
        if (myWorkspaces.constructor === Object) {
          const myWorkspacesArray = [myWorkspaces];
          set(() => ({ myWorkspaces: myWorkspacesArray }));
        } else {
          set(() => ({ myWorkspaces }));
        }
      },
      
      clearToken: () => {
        clearItem('token');
      },
    }),
    'authStore',
  ),
);

export default useAuthStore;
