import { ChangeEvent, ElementRef, useRef, useState } from 'react';
import { ImageIcon, Smile, X } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import isArabic from 'is-arabic';

import { Button } from 'shared/components/ui/button';

import { IconPicker } from './icon-picker';
import { DocumentPropsType } from 'shared/types/Propstypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocument } from '@/services/api/documents/updateDocument';
import toast from 'react-hot-toast';
import { useParams } from 'react-router';

interface ToolbarProps {
  initialData: DocumentPropsType;
  preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { documentId } = useParams();

  const queryClient = useQueryClient();
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData?.title);

  const cloudName = import.meta.env.VITE_CLOUDNAME;
  const unsignedUploadPreset = import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET;

  const { mutateAsync: updateDocEmoji } = useMutation({
    mutationFn: async ({
      documentId,
      emoji,
    }: {
      documentId: string;
      emoji: string;
    }) => {
      const { error, data }: any = await updateDocument({
        documentId,
        body: {
          emoji: emoji,
        },
      });

      if (error) {
        toast.error('Changing emoji Failed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

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

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData?.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (inputValue: string) => {
    updateDocTitle({
      documentId: initialData.id,
      title: inputValue,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (emoji: string) => {
    updateDocEmoji({
      documentId: initialData.id,
      emoji,
    });
  };

  const onRemoveIcon = () => {
    updateDocEmoji({
      documentId: initialData.id,
      emoji: '',
    });
  };

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

  const options = {
    count: 10,
  };
  const isArabicTitle = isArabic(initialData?.title, options);

  return (
    <div
      className={`pl-[20px] sm:pl-[36px] md:pl-[54px] group relative ${isArabicTitle && initialData?.title !== '' && initialData?.title !== ' ' ? '[direction:rtl]' : ''} `}
    >
      {!!initialData?.emoji && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData?.emoji}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!!initialData?.emoji && preview && (
        <p className="text-6xl pt-6">{initialData?.emoji}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {!initialData?.emoji && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="h-4 w-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImageUrl && !preview && (
          <>
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
              accept="image/*"
            />
          </>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={initialData?.title}
          onChange={(e) => onInput(e.target.value)}
          className="text-5xl bg-transparent font-bold break-words w-full outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        />
      ) : (
        <div
          onClick={enableInput}
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
        >
          {initialData?.title}
        </div>
      )}
    </div>
  );
};
