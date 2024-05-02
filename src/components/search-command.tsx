import { useEffect, useState } from 'react';
import { File } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getDocumentsofWorkspace } from 'api/documents/getDocumentsofWorkspace';
import { DocumentPropsType } from '@/types/Propstypes';
import { useSearch } from 'shared/hooks/use-search';

export const SearchCommand = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [toggle]);

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

  const onSelect = (id: string) => {
    navigate(`/workspaces/${workspaceId}/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  const user = {
    fullName: 'John Doe',
  };
  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.fullName || 'username'}'s Jotion...`}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document: DocumentPropsType) => (
            <CommandItem
              key={document.id}
              value={`${document.id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document.id)}
            >
              {document.emoji ? (
                <p className="mr-2 text-[18px]">{document.emoji}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>{document.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
