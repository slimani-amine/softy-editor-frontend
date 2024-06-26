import { cn } from '@/lib/utils';
import { Item } from './item';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
<<<<<<< HEAD
import { getDocumentsofWorkspace } from '@/services/api/documents/getDocumentsofWorkspace';
import { DocumentItemPropsType, DocumentPropsType } from 'shared/types/Propstypes';
=======
import { getDocumentsofWorkspace } from 'api/documents/getDocumentsofWorkspace';
import { DocumentPropsType } from '@/types/Propstypes';
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
import DocumentItem from './DocumentItem';

export const DocumentList = ({ parentDocumentId, level = 0 }: any) => {
  const params = useParams();

  const { workspaceId } = params;
  const isTemporarilyDeleted = false;
  const {
    isLoading,
    data: documents,
    error,
  } = useQuery({
    queryKey: ['documents', workspaceId],
    queryFn: async () =>
      await getDocumentsofWorkspace({ workspaceId, isTemporarilyDeleted }),
  });

  if (isLoading) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {!documents?.length && (
        <p
          className={cn(
            'pl-4 text-xs pb-4 font-medium text-muted-foreground/80',
          )}
        >
          No pages inside
        </p>
      )}
      {documents.map((document: DocumentPropsType) => (
        <DocumentItem document={document} key={document?.id} />
      ))}
    </>
  );
};
