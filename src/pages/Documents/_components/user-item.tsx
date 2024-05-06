<<<<<<< HEAD
import { ChevronsLeftRight } from 'lucide-react';
// import { useUser, SignOutButton } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from 'shared/components/ui/avatar';
=======
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/components/ui/dropdown-menu';
import useAuthStore from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD
import { getMyWorkspaces } from '@/services/api/workspaces/getMyWorkspaces';
import { getMe } from '@/services/api/users/getMe';
=======
import { getMe } from 'api/users/getMe';
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
import { Navigate, useParams } from 'react-router-dom';
import WorkSpaceBoxInNavigation from './WorkSpaceBoxInNavigation';
import WorkspaceBoxInDropDown from './WorkspaceBoxInDropDown';
import Spinner from 'shared/components/Shared/Spinner';
import { clearTokens } from '@/lib/utils/token';
<<<<<<< HEAD
import { Workspace } from 'shared/types/workspace';
=======
import { ChevronsLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserItemMenu } from './user-item-menu';
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2

export const UserItem = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    myWorkspaces,
    setMyWorkspaces,
    user,
  } = useAuthStore((state) => state);
  const params = useParams();
  const { workspaceId } = params;
<<<<<<< HEAD
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
=======
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2

  const wantedWorkspace = myWorkspaces?.find(
    (workspace: Workspace) => workspace?.id === Number(workspaceId),
  );
  const handleLogout = () => {
    clearTokens();
    setIsAuthenticated(false);
    setMyWorkspaces([]);
  };

  if (!wantedWorkspace) return <Navigate to={'/'} />;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex  items-center text-sm p-3 w-full hover:bg-primary/5"
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
          <div className="flex justify-between items-center px-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.email || 'unknown email'}
            </p>
<<<<<<< HEAD
          )}

          {myWorkspaces && myWorkspaces?.length > 0 &&
            myWorkspaces?.map((workspace: Workspace) => (
=======
            <UserItemMenu />
          </div>
          {myWorkspaces?.length > 0 &&
            myWorkspaces?.map((workspace: any) => (
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
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
          <Button onClick={handleLogout} variant={'ghost'}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
