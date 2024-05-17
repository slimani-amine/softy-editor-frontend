import { useRef, useState } from 'react';
import { Input } from 'shared/components/ui/input';
import { Button } from 'shared/components/ui/button';
import { Skeleton } from 'shared/components/ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '@/services/api/documents/updateDocument';
import { DocumentItemPropsType } from 'shared/types/Propstypes';
import toast from 'react-hot-toast';

export const Title = ({ document }: DocumentItemPropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(document.title || 'Untitled');
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(document.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const { mutateAsync: updateDocTitle } = useMutation({
    mutationFn: async ({
      documentId,
      title,
    }: {
      documentId: string;
      title: string;
    }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          title: title,
        },
      });

      if (error) {
        toast.error('Changing title Failed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    updateDocTitle({
      documentId: document.id,
      title: event.target.value || 'Untitled',
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1 _xs:!hidden">
      {!!document?.emoji && <p>{document?.emoji}</p>}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant="ghost"
          size="sm"
          className="font-normal h-auto p-1 max-w-24  sm:max-w-64 md:max-w-80 lg:max-w-[600px]"
        >
          <span className="truncate ">{document?.title}</span>
        </Button>
      )}
    </div>
  );
};

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="h-9 w-20 rounded-md" />;
};
