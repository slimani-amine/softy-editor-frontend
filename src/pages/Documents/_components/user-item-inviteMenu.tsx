import { useNavigate } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shared/components/ui/dropdown-menu';
import { Button } from 'shared/components/ui/button';
import { Skeleton } from 'shared/components/ui/skeleton';
import { MoreHorizontal, Plus, Trash } from 'lucide-react';
import { useDeleteWorkspace } from '@/services/queries/workspace.query';
import useAuthStore from '@/store/useAuthStore';

export const UserItemInviteMenu = ({
  workspaceId,
  isCreator,
}: {
  workspaceId: number;
  isCreator: boolean;
}) => {
  const { myWorkspaces, setMyWorkspaces } = useAuthStore((state) => state);
  const navigate = useNavigate();

  const inviteHandleClick = async () => {
    navigate(`/workspaces/${workspaceId}/invite`);
  };

  const { isLoading, mutateAsync: deleteWorkspaceApi }: any =
    useDeleteWorkspace();

  const deleteWorkspace = async () => {
    const res = await deleteWorkspaceApi(workspaceId);
    if (res) {
      const updatedWorkspaces =
      myWorkspaces &&
      (myWorkspaces.filter(
        (workspace) => workspace.id !== workspaceId,
      ) as any);
      console.log("🚀 ~ deleteWorkspace ~ updatedWorkspaces:", updatedWorkspaces)
      if (updatedWorkspaces.length > 0) {
        setMyWorkspaces(updatedWorkspaces);
      } else {
        setMyWorkspaces([]);
        navigate('/onboarding');
      }
    }
  };

  if (isCreator) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-60"
          align="end"
          alignOffset={8}
          forceMount
        >
          <DropdownMenuItem onClick={inviteHandleClick}>
            <Plus className="h-4 w-4 mr-2" />
            Invite members
          </DropdownMenuItem>
          <DropdownMenuItem onClick={deleteWorkspace}>
            <Trash className="h-4 w-4 mr-2" />
            Delete workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else {
    return null;
  }
};

UserItemInviteMenu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
