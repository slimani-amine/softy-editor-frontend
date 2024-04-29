// import { useQuery } from "convex/react";
// import { useParams } from "next/navigation";
import { MenuIcon } from 'lucide-react';

// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";

import { Title } from './title';
import { Banner } from './banner';
import { Menu } from './menu';
import { Publish } from './publish';
import { useTheme } from '@/components/providers/theme-provider';
import Button from '@/components/Button';
import { ModeToggle } from '@/components/mode-toggle';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getDocumentById } from 'api/documents/getDocumentById';

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const { documentId } = useParams();
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
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null || document?.statusCode === 404) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#191919] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title document={document} />
          <div className="flex items-center gap-x-2">
            <Publish document={document} />
            <ModeToggle />
            <Menu document={document} />
          </div>
        </div>
      </nav>
      {document?.isTemporarilyDeleted && <Banner documentId={document?.id} />}
    </>
  );
};
