import { ChevronsLeftRight } from 'lucide-react';
// import { useUser, SignOutButton } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import { getMyWorkspaces } from '@/services/api/workspaces/getMyWorkspaces';
import { getMe } from '@/services/api/users/getMe';
import { Navigate, useParams } from 'react-router-dom';
import WorkSpaceBoxInNavigation from './WorkSpaceBoxInNavigation';
import WorkspaceBoxInDropDown from './WorkspaceBoxInDropDown';
import Spinner from '@/components/Shared/Spinner';
import { clearTokens } from '@/lib/utils/token';
import { Workspace } from '@/types/workspace';

export const UserItem = () => {
  const { isAuthenticated, setIsAuthenticated, myWorkspaces , setMyWorkspaces } = useAuthStore(
    (state) => state
  );
  
  // Check if myWorkspaces is an empty object

  

  const params = useParams();
  const { workspaceId } = params;
  // const {
  //   isLoading,
  //   data: myWorkspaces,
  //   error,
  // } = useQuery({
  //   queryKey: ['workspaces'],
  //   queryFn: async () => await getMyWorkspaces(),
  // });

  const {
    isLoading: isLoadingMe,
    data: me,
    error: errorMe,
  } = useQuery({
    queryKey: ['me'],
    queryFn: async () => await getMe(),
  });

  const wantedWorkspace = myWorkspaces?.find(
    (workspace: Workspace) => workspace?.id === Number(workspaceId),
  );
  const handleLogout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setMyWorkspaces([])
  };

  if (!wantedWorkspace) return <Navigate to={'/'} />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <WorkSpaceBoxInNavigation
            workspace={wantedWorkspace}
            key={wantedWorkspace.id}
          />

          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80 dark:bg-[#202020] shadow-2xl"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 py-2">
          {isLoadingMe ? (
            <Spinner />
          ) : (
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {me?.email || 'unknown email'}
            </p>
          )}

          {myWorkspaces && myWorkspaces?.length > 0 &&
            myWorkspaces?.map((workspace: Workspace) => (
              <WorkspaceBoxInDropDown
                workspace={workspace}
                inWorkspaceId={workspaceId}
                key={workspace.id}
              />
            ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full cursor-pointer text-muted-foreground"
        >
          {/* <Button
            text={'Log out'}
            onClick={() => {
              setIsAuthenticated(false);
            }}
          /> */}
          <button onClick={handleLogout}>Logout</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
