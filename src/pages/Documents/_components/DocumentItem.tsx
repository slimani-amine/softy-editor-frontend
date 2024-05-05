import React from 'react';
import {
  ChevronDown,
  ChevronRight,
  FileIcon,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from 'lucide-react';
// import { useMutation } from "convex/react";
// import { useUser } from "@clerk/clerk-react";

// import { Id } from "@/convex/_generated/dataModel";
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
// import { api } from "@/convex/_generated/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useNavigate, useParams } from 'react-router';
import { DocumentItemPropsType } from '@/types/Propstypes';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '@/services/api/documents/updateDocument';
import toast from 'react-hot-toast';
import { formatDate } from 'shared/helpers/formatDate';

export default function DocumentItem({ document }: DocumentItemPropsType) {
  const { workspaceId, documentId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const onArchive = async (documentId: string) => {
    await updateDocIsPermanentlyDeleted({ documentId });
  };

  return (
    <Link
      to={`/workspaces/${workspaceId}/documents/${document?.id}`}
      className={cn(
        'group min-h-[27px] text-sm py-2 pr-3 w-full hover:bg-primary/5 flex items-center text-gray-400 font-medium pl-3',
        Number(documentId) === Number(document?.id) &&
          'bg-primary/5 text-primary',
      )}
    >
      {document?.emoji ? (
        <div className="shrink-0 mr-2 text-[18px]">{document?.emoji}</div>
      ) : (
        <FileIcon className="shrink-0 h-[18px] w-[18px] mr-2 text-muted-foreground" />
      )}
      <span className="truncate ml-1">{document?.title}</span>

      <div className="ml-auto flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
            <div
              role="button"
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-2"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-60"
            align="start"
            side="right"
            forceMount
          >
            <DropdownMenuItem onClick={() => onArchive(document?.id)}>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="text-xs text-muted-foreground p-2">
              Last edited at: {formatDate(document?.updatedAt)}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  );
}
