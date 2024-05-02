import { Cover } from '@/components/cover';
import PlateEditor from '@/components/plate-editor';
import { Toolbar } from '@/components/toolbar';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from 'api/documents/getDocumentById';
import React from 'react';
import { useParams } from 'react-router';

export default function PreviewDocument() {
  const params = useParams();
  const { documentId } = params;

  const {
    isLoading,
    data: document,
    error,
  } = useQuery({
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

  if (
    !document?.isPublished ||
    document?.isTemporarilyDeleted ||
    document === null
  )
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10 ">
          <div className="text-2xl text-gray-600 ">Not found...</div>
        </div>
      </div>
    );
  return (
    <div className="pb-40 dark:bg-[#191919]">
      <Cover url={document?.coverImageUrl} preview={document?.isPublished} />
      <div className=" mx-20">
        <Toolbar initialData={document} preview={document?.isPublished} />
        <PlateEditor document={document} />
      </div>
    </div>
  );
}
