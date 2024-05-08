import { useNavigate } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'shared/components/ui/dropdown-menu';
import { Button } from 'shared/components/ui/button';
import { Skeleton } from 'shared/components/ui/skeleton';
import { MoreHorizontal, Plus } from 'lucide-react';
import { FaMoneyCheck } from 'react-icons/fa';

export const UserItemInviteMenu = ({
  workspaceId,
  isCreator,
}: {
  workspaceId: number;
  isCreator: boolean;
}) => {
  const navigate = useNavigate();

  const inviteHandleClick = async () => {
    navigate(`/workspaces/${workspaceId}/invite`);
  };
  const upgradeHandleClick = async () => {
    navigate(`/pricing`);
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
          <DropdownMenuItem onClick={upgradeHandleClick}>
            <FaMoneyCheck className="h-4 w-4 mr-2" />
            Upgrade your plan
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
