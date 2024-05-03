import { useMemo, useRef } from 'react';
import { cn } from '@udecode/cn';
import { CommentsProvider } from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { MENTIONABLES } from '@/lib/plate/mentionables';
import { plugins } from '@/lib/plate/plate-plugins';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import { DropdownSlash } from './plate-ui/dropdown-slash';
import { SlashToolbar } from './plate-ui/slashToolBar';
import { TooltipProvider } from './plate-ui/tooltip';
import { DocumentItemPropsType } from '@/types/Propstypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDocumentContent } from 'api/documents/updateDocumentContent';
import { useLocation, useParams } from 'react-router';
import { formatDocContent } from 'shared/helpers/formatDocContent';
import toast from 'react-hot-toast';

export default function PlateEditor({ document }: DocumentItemPropsType) {
  const containerRef = useRef(null);
  const params = useParams();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const { documentId } = params;

  // const test = `[${document?.content.slice(2, -2).replaceAll(`}","{`, `},{`)}]`;
  // console.log(test);
  // // console.log(`[${document?.content.slice(2, -2).replaceAll(`}","{`, `},{`)}]`);

  // const parsedInput = JSON.parse(test);
  // console.log(parsedInput);

  //

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

  // const x = `{"{\"type\":\"p\",\"children\":[{\"text\":\"desfqdfg\\\"\"}]}"}`;
  // console.log(`[${x.slice(2, -2).replaceAll(`}","{`, `},{`)}]`);
  // console.log(
  //   formatDocContent(`[${x.slice(2, -2).replaceAll(`}","{`, `},{`)}]`),
  // );

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
                '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4',
              )}
            >
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
