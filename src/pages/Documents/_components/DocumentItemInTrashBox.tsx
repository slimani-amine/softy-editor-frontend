import { DocumentItemPropsType, DocumentPropsType } from '@/types/Propstypes';
import { useNavigate, useParams } from 'react-router-dom';
import { Trash, Undo } from 'lucide-react';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from 'api/documents/updateDocument';
import { deleteDocument } from 'api/documents/deleteDocument';

export default function DocumentItemInTrashBox({
  document,
}: DocumentItemPropsType) {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: updateDocIsPermanentlyDeleted } = useMutation({
    mutationFn: async ({ documentId }: { documentId: string }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          isTemporarilyDeleted: false,
        },
      });
      if (error) {
        toast.error('Failed to restore note.');
      }
    },
    onSuccess: () => {
      toast.success('Note restored!');
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const { mutateAsync: deleteDocumentApi } = useMutation({
    mutationFn: async ({ documentId }: { documentId: string }) => {
      const { error }: any = await deleteDocument({
        documentId,
      });
      if (error) {
        toast.error('Failed to delete note.');
      }
    },
    onSuccess: () => {
      toast.success('Note deleted!');
      navigate(`/workspaces/${workspaceId}/documents`);
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
  const onRemove = async (documentId: string) => {
    await deleteDocumentApi({ documentId });
  };

  const onRestore = async (documentId: string) => {
    await updateDocIsPermanentlyDeleted({ documentId });
  };

  return (
    <div
      onClick={() =>
        navigate(`/workspaces/${workspaceId}/documents/${document.id}`)
      }
      key={document.id}
      className="cursor-pointer text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
    >
      <span className="truncate pl-2">{document.title}</span>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRestore(document.id);
          }}
          className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
        >
          <Undo className="h-4 w-4 text-muted-foreground" />
        </button>
        <ConfirmModal onConfirm={() => onRemove(document.id)}>
          <button className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600">
            <Trash className="h-4 w-4 text-muted-foreground" />
          </button>
        </ConfirmModal>
      </div>
    </div>
  );
}
