import { ChevronsLeftRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/components/ui/dropdown-menu';
import useAuthStore from '@/store/useAuthStore';
import { Navigate, useParams } from 'react-router-dom';
import WorkSpaceBoxInNavigation from './WorkSpaceBoxInNavigation';
import WorkspaceBoxInDropDown from './WorkspaceBoxInDropDown';
import { clearTokens } from '@/lib/utils/token';
import { Workspace } from 'shared/types/workspace';
import { Button } from 'shared/components/ui/button';

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
          </div>

          {myWorkspaces &&
            myWorkspaces?.length > 0 &&
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
          <Button onClick={handleLogout} variant={'ghost'}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
