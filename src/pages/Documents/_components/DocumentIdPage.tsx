import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocumentById } from '@/services/api/documents/getDocumentById';
import { updateDocumentContent } from '@/services/api/documents/updateDocumentContent';
import toast from 'react-hot-toast';
import { SocketContext } from 'socket';
import useAuthStore from '@/store/useAuthStore';
import { compareArrays } from 'shared/helpers/compareArrays';
import { Toolbar } from 'shared/components/toolbar';
import { Cover } from 'shared/components/cover';
import { Skeleton } from 'shared/components/ui/skeleton';
import { SoftyNote } from 'tk-note';
import { formatDocContent } from 'shared/helpers/formatDocContent';

const DocumentIdPage = () => {
  const [content, setContent] = useState();
  const { documentId, workspaceId } = useParams();
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const { user } = useAuthStore((state) => state);

  const { isLoading, data: document } = useQuery({
    queryKey: ['documents', documentId],
    queryFn: async () => await getDocumentById({ documentId }),
  });

  const { mutateAsync: updateContent } = useMutation({
    mutationFn: async (content) => {
      try {
        await updateDocumentContent({ documentId, content });
        // queryClient.invalidateQueries({ queryKey: ['documents'] });
      } catch (error) {
        toast.error('Changing Content Failed.');
      }
    },
  });

  const editorHandler = async (data: any) => {
    console.log(documentId);
    if (!documentId) return;
    if (!compareArrays(data, content)) {
      await updateContent(data);
      console.log('updated');
    }
    socket.emit('send-changes', { data, documentId });
  };

  useEffect(() => {
    if (socket === null || !documentId) return;

    socket.emit('join', documentId);
    console.log('joined');
    console.log(content);

    // return () => {
    //   socket.off('receive-changes');
    // };
  }, [socket, documentId]);

  useEffect(() => {
    if (socket === null || !documentId || !user) return;

    const socketHandler = async (data: any, id: string) => {
      console.log(id);
      console.log(documentId);
      if (id === documentId) {
        // Update local state with received changes
        setContent(data);
        await updateContent(data);

        console.log('here it is ');
      }
    };

    socket.on('receive-changes', socketHandler);

    return () => {
      socket.off('receive-changes', socketHandler);
    };
  }, [socket, documentId, setContent, user]);

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
      : [{ type: 'p', children: [{ text: '' }] }];

  return (
    <div className="pb-40">
      <Cover url={document?.coverImageUrl} />
      <div className="lg:mx-10 ">
        {/* {socket.connected ? 'connected' : 'disconnected'} */}
        <Toolbar initialData={document} />
        <SoftyNote
          onChange={(newContent) => {
            editorHandler(newContent);
          }}
          initialValue={initialValue}
          readOnly={false}
          editorClassName="px-[36px] lg:!px-[96px]"
          key={`${documentId} ${JSON.stringify(initialValue)}`}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
