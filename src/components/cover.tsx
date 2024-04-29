import { useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
// import { useMutation } from "convex/react";
// import { useParams } from "next/navigation";

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from '@/hooks/use-cover-image';
import { useParams } from 'react-router';
import { updateDocument } from 'api/documents/updateDocument';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const { documentId } = useParams();
  const queryClient = useQueryClient();
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const { mutateAsync: removeCoverImg } = useMutation({
    mutationFn: async ({ documentId }: { documentId: string }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          coverImageUrl: null,
        },
      });
      if (error) {
        toast.error('Failed to remove cover.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const { mutateAsync: updateDocCoverImg } = useMutation({
    mutationFn: async ({
      documentId,
      url,
    }: {
      documentId: string;
      url: string;
    }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          coverImageUrl: url,
        },
      });

      if (error) {
        toast.error('Adding cover image Failed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  if (!documentId) return;
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      if (coverImgUrl.trim() === '') return;
      updateDocCoverImg({ documentId, url: coverImgUrl });
      setIsClicked(false);
      setCoverImgUrl('');
    }
  };

  const onRemove = async () => {
    removeCoverImg({
      documentId,
    });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[35vh] group',
        !url && 'h-[12vh]',
        url && 'bg-muted',
      )}
    >
      {!!url && (
        <img src={url} alt="Cover" className="object-cover w-full h-full" />
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-x-2">
          <Button
            onClick={() => setIsClicked((prev) => !prev)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          {isClicked ? (
            <input
              type="text"
              placeholder="type the url here ..."
              className="p-2 pl-2 rounded-lg border border-gray-200 text-xs placeholder:text-xs placeholder:font-extralight w-full dark:bg-gray-900"
              value={coverImgUrl}
              onChange={(e) => setCoverImgUrl(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : null}
          <Button
            onClick={onRemove}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[12vh]" />;
};
