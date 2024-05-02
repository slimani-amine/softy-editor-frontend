import { useNavigate, useParams } from 'react-router';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MoreHorizontal, Plus } from 'lucide-react';

export const UserItemMenu = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    navigate(`/workspaces/createWorkspace`);
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
        <DropdownMenuItem onClick={handleClick}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

UserItemMenu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
