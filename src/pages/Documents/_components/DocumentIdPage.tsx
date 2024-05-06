<<<<<<< HEAD
// import { useMutation, useQuery } from 'convex/react';
// import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// import { api } from '@/convex/_generated/api';
// import { Id } from '@/convex/_generated/dataModel';
import { Toolbar } from 'shared/components/toolbar';
import { Cover } from 'shared/components/cover';
import { Skeleton } from 'shared/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import { title } from 'process';
import Editor from 'shared/components/editor';
import PlateEditor from 'shared/components/plate-editor';
=======
import { Toolbar } from '@/components/toolbar';
import { Cover } from '@/components/cover';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'react-router-dom';
import PlateEditor from '@/components/plate-editor';
>>>>>>> c72175d2c8fd4058ab06e8133095992d78db29f2
import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from '@/services/api/documents/getDocumentById';

const DocumentIdPage = () => {
  const params = useParams();
  const { documentId, workspaceId } = params;

  const { isLoading, data: document } = useQuery({
    queryKey: ['documents', documentId],
    queryFn: async () => await getDocumentById({ documentId }),
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

  return (
    <div className="pb-40">
      <Cover url={document?.coverImageUrl} />
      <div className=" mx-20">
        <Toolbar initialData={document} />
        <PlateEditor document={document} />
      </div>
    </div>
  );
};

export default DocumentIdPage;
