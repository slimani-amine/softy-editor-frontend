import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';
// import { useRouter } from "next/navigation";

// import { api } from "@/convex/_generated/api";
import { Button } from 'shared/components/ui/button';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDocument } from '@/services/api/documents/createDocument';
import { getDocumentsofWorkspace } from '@/services/api/documents/getDocumentsofWorkspace';
import { useEffect } from 'react';
import { getWorkspaceById } from '@/services/api/workspaces/getWorkspaceById';
import Spinner from 'shared/components/Shared/Spinner';

const DocumentsEmptyPage = () => {
  const navigate = useNavigate();
  const user = {
    firstName: 'Anonymous',
  };

  const queryClient = useQueryClient();
  const { workspaceId } = useParams();

  const { mutateAsync: createDocApi } = useMutation({
    mutationFn: async () => {
      try {
        const data = await createDocument({
          title: 'Untitled',
          workspace: { id: workspaceId },
        });
        return data;
      } catch (error) {
        toast.error('Failed to create new Note !');
      }
    },
    onSuccess: (data) => {
      toast.success('Note created!');
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      navigate(`/workspaces/${workspaceId}/documents/${data?.id}`);
    },
  });

  const isTemporarilyDeleted = false;
  const { isLoading, data: documents } = useQuery({
    queryKey: ['documents', workspaceId],
    queryFn: async () =>
      await getDocumentsofWorkspace({ workspaceId, isTemporarilyDeleted }),
  });
  useEffect(() => {
    if (!isLoading && documents?.length >= 0 && documents[0]?.id) {
      navigate(`/workspaces/${workspaceId}/documents/${documents[0]?.id}`);
    }
  }, [isLoading, documents, navigate, workspaceId]);

  if (isLoading) {
    return (
      <div className="h-full w-full items-center justify-center flex">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img
        src="/empty.png"
        height="300"
        width="300"
        alt="Empty"
        className="dark:hidden"
      />
      <img
        src="/empty-dark.png"
        height="300"
        width="300"
        alt="Empty"
        className="hidden dark:block"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName || 'Anonymous'}&apos;s E-ditor
      </h2>
      <Button onClick={() => createDocApi()}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsEmptyPage;
