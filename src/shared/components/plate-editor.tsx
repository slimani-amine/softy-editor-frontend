import { useMemo, useRef } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from 'shared/components/plate-ui/comments-popover';
import { CursorOverlay } from 'shared/components/plate-ui/cursor-overlay';
import { Editor } from 'shared/components/plate-ui/editor';
import { FloatingToolbar } from 'shared/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from 'shared/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from 'shared/components/plate-ui/mention-combobox';
// import { FixedToolbar } from 'shared/components/plate-ui/fixed-toolbar';
// import { FixedToolbarButtons } from 'shared/components/plate-ui/fixed-toolbar-buttons';

import { DropdownSlash } from './plate-ui/dropdown-slash';
import { SlashToolbar } from './plate-ui/slashToolBar';

import { TooltipProvider } from './plate-ui/tooltip';
import { DocumentItemPropsType } from 'shared/types/Propstypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentContent } from '@/services/api/documents/updateDocumentContent';
import { useLocation, useParams } from 'react-router';
import { formatDocContent } from 'shared/helpers/formatDocContent';
import toast from 'react-hot-toast';

export default function PlateEditor({ document }: DocumentItemPropsType) {
  const containerRef = useRef(null);
  const params = useParams();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { documentId } = params;

  const initialValue =
    document?.content !== null
      ? formatDocContent(
          `[${document?.content.slice(2, -2).replace(/\\/g, '').replaceAll(`}","{`, `},{`)}]`,
        )
      : [
          {
            type: 'p',
            children: [
              {
                text: '',
              },
            ],
          },
        ];

  const { mutateAsync: updateContent } = useMutation({
    mutationFn: async (content: any) => {
      const { error, data }: any = await updateDocumentContent({
        documentId,
        content,
      });

      if (error) {
        toast.error('Changing Content Failed.');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

  const key = useMemo(() => {
    if (initialValue) {
      return window.crypto.randomUUID();
    }
  }, [initialValue]);

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          onChange={(e) => updateContent(e)}
          key={documentId}
          {...(pathname.split('/').includes('preview')
            ? { readOnly: true }
            : null)}
        >
          <TooltipProvider>
            <div
              ref={containerRef}
              className={cn(
                'relative',
                // Block selection
                '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4',
              )}
            >
              {/* <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar> */}

              <Editor
                className="px-[96px] py-16 dark:bg-[#191919]"
                autoFocus
                focusRing={false}
                variant="ghost"
                size="md"
              />

              <FloatingToolbar>
                <FloatingToolbarButtons />
              </FloatingToolbar>

              <SlashToolbar>
                <DropdownSlash />
              </SlashToolbar>

              <MentionCombobox items={MENTIONABLES} />

              <CommentsPopover />

              <CursorOverlay containerRef={containerRef} />
            </div>
          </TooltipProvider>
        </Plate>
      </CommentsProvider>
    </DndProvider>
  );
}
