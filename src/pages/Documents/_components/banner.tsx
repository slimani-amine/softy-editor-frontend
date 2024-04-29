// import { useMutation } from "convex/react";

// import { Id } from "@/convex/_generated/dataModel";
// import { api } from "@/convex/_generated/api";
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/modals/confirm-modal';
import { useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from 'api/documents/updateDocument';
import { deleteDocument } from 'api/documents/deleteDocument';

interface BannerProps {
  documentId: string;
}

export const Banner = ({ documentId }: BannerProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { workspaceId } = useParams();
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
    },
  });

  const onRemove = async () => {
    await deleteDocumentApi({ documentId });
  };

  const onRestore = async () => {
    await updateDocIsPermanentlyDeleted({ documentId });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
