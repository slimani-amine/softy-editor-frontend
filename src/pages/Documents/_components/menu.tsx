// import { useUser } from "@clerk/clerk-react";
// import { useMutation } from "convex/react";
import { toast } from 'sonner';
import { MoreHorizontal, Trash } from 'lucide-react';

// import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
// import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router';

interface MenuProps {
  documentId: any;
}
export const Menu = ({ documentId }: MenuProps) => {
  const navigate = useNavigate();
  const user = {
    fullName: 'Anonymous',
    emailAddresses: [
      {
        emailAddress: 'unknown email',
      },
    ],
    imageUrl:
      'https://i.pinimg.com/236x/54/72/d1/5472d1b09d3d724228109d381d617326.jpg',
  };
  // const { user } = useUser();

  // const archive = useMutation(api.documents.archive);

  // const onArchive = () => {
  //   const promise = archive({ id: documentId });

  //   toast.promise(promise, {
  //     loading: 'Moving to trash...',
  //     success: 'Note moved to trash!',
  //     error: 'Failed to archive note.',
  //   });

  //   router.push('/documents');
  // };

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
        <DropdownMenuItem
        // onClick={onArchive}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName || 'Anonymous'}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
