import { Toolbar } from 'shared/components/toolbar';
import { Cover } from 'shared/components/cover';
import { Skeleton } from 'shared/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocumentById } from '@/services/api/documents/getDocumentById';
import { SoftyNote } from 'tk-note';
import { formatDocContent } from 'shared/helpers/formatDocContent';
import { updateDocumentContent } from '@/services/api/documents/updateDocumentContent';
import toast from 'react-hot-toast';

const DocumentIdPage = () => {
  const params = useParams();
  const { documentId, workspaceId } = params;
  const queryClient = useQueryClient();

  const { isLoading, data: document } = useQuery({
    queryKey: ['documents', documentId],
    queryFn: async () => await getDocumentById({ documentId }),
  });

  const { mutateAsync: updateContent } = useMutation({
    mutationFn: async (content: any) => {
      const { error, data }: any = await updateDocumentContent({
        documentId,
        content,
      });

      if (error) {
        toast.error('Changing Content Failed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  if (isLoading) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  const isInWorkspace = document?.workspace?.id === Number(workspaceId);
  if (document === null || document?.statusCode === 404 || !isInWorkspace) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="text-2xl text-gray-600 ">Document Not found...</div>
        </div>
      </div>
    );
  }

  const initialValue =
    document?.content !== null
      ? formatDocContent(
          `[${document?.content.slice(2, -2).replace(/\\/g, '').replaceAll(`}","{`, `},{`)}]`,
        )
      : [
          {
            type: 'p',
            children: [
              {
                text: '',
              },
            ],
          },
        ];
  return (
    <div className="pb-40">
      <Cover url={document?.coverImageUrl} />
      <div className="lg:mx-10 ">
        <Toolbar initialData={document} />
        <SoftyNote
          onChange={(e) => updateContent(e)}
          initialValue={initialValue}
          readOnly={false}
          key={documentId}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
