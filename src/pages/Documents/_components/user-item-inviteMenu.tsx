import { useNavigate, useParams } from 'react-router';
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
}: {
  workspaceId: number;
}) => {
  const navigate = useNavigate();

  const inviteHandleClick = async () => {
    navigate(`/workspaces/${workspaceId}/invite`);
  };
  const upgrateHandleClick = async () => {
    navigate(`/pricing`);
  };

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
        <DropdownMenuItem onClick={upgrateHandleClick}>
          <FaMoneyCheck className="h-4 w-4 mr-2" />
          Upgrate your plan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

UserItemInviteMenu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
