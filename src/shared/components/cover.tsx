import { ChangeEvent, useRef, useState } from 'react';
import { ImageIcon, X } from 'lucide-react';
import { Skeleton } from 'shared/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from 'shared/components/ui/button';
import { useParams } from 'react-router';
import { updateDocument } from '@/services/api/documents/updateDocument';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface CoverImageProps {
  url?: string;
  preview?: boolean;
}

interface ImageUploadButtonProps {
  onImageSelect: (images: FileList) => void;
}

export const Cover = ({ url, preview }: CoverImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { documentId } = useParams();
  const queryClient = useQueryClient();
  const [coverImgUrl, setCoverImgUrl] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const cloudName = import.meta.env.VITE_CLOUDNAME;
  const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

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

  const uploadFile = (file: any) => {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const fd = new FormData();
    fd.append('upload_preset', unsignedUploadPreset);
    fd.append('tags', 'browser_upload');
    fd.append('file', file);

    fetch(url, {
      method: 'POST',
      body: fd,
    })
      .then((response) => response.json())
      .then(async (data) => {
        const url = data.secure_url;
        if (documentId) await updateDocCoverImg({ documentId, url });
      })
      .catch((error) => {
        console.error('Error uploading the file:', error);
      });
  };

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        uploadFile(file);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
            onClick={handleClick}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Change cover
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageSelect}
            accept="image/*" // Only allow selection of image files
            multiple // Allow multiple file selection
          />

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
