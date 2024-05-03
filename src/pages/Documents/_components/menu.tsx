import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { updateDocument } from 'api/documents/updateDocument';
import { DocumentItemPropsType } from '@/types/Propstypes';
import { MoreHorizontal, Trash } from 'lucide-react';
import { formatDate } from 'shared/helpers/formatDate';

export const Menu = ({ document }: DocumentItemPropsType) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateDocIsPermanentlyDeleted } = useMutation({
    mutationFn: async ({ documentId }: { documentId: string }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          isTemporarilyDeleted: true,
        },
      });
      if (error) {
        toast.error('Failed to archive note.');
      }
    },
    onSuccess: () => {
      toast.success('Note moved to trash!');
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const onArchive = async () => {
    await updateDocIsPermanentlyDeleted({ documentId: document?.id });
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
        {!document?.isTemporarilyDeleted && (
          <>
            <DropdownMenuItem onClick={onArchive}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <div className="text-xs text-muted-foreground p-2">
          Last edited at: {formatDate(document?.updatedAt)}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
