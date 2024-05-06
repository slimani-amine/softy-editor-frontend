import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from 'shared/components/ui/input';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getDocumentsofWorkspace } from '@/services/api/documents/getDocumentsofWorkspace';
import { DocumentPropsType } from 'shared/types/Propstypes';
import DocumentItemInTrashBox from './DocumentItemInTrashBox';
import Spinner from 'shared/components/Shared/Spinner';

export const TrashBox = () => {
  const params = useParams();
  const [search, setSearch] = useState('');

  const { workspaceId } = params;
  const isTemporarilyDeleted = true;
  const {
    isLoading,
    data: documentsTemporarilyDeleted,
    error,
  } = useQuery({
    queryKey: ['documents', workspaceId, 'inTrash'],
    queryFn: async () =>
      await getDocumentsofWorkspace({
        workspaceId,
        isTemporarilyDeleted,
      }),
  });
  const filteredDocuments = documentsTemporarilyDeleted?.filter(
    (document: DocumentPropsType) => {
      return document.title.toLowerCase().includes(search.toLowerCase());
    },
  );

  return (
    <div className="text-sm dark:bg-[#202020]">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        {isLoading ? (
          <div className="h-full flex items-center justify-center p-4 dark:bg-[#202020]">
            <Spinner />
          </div>
        ) : !documentsTemporarilyDeleted?.length ? (
          <p className=" last:block text-xs text-center text-muted-foreground pb-2">
            No documents found.
          </p>
        ) : (
          filteredDocuments?.map((document: DocumentPropsType) => (
            <DocumentItemInTrashBox document={document} key={document.id} />
          ))
        )}
      </div>
    </div>
  );
};
