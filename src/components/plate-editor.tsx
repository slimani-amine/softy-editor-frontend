import React, { useRef } from 'react';
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
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';

import { DropdownSlash } from './plate-ui/dropdown-slash';
import { InsertDropdownMenu } from './plate-ui/insert-dropdown-menu';
import { SlashToolbar } from './plate-ui/slashToolBar';
import { TooltipProvider } from './plate-ui/tooltip';

export default function PlateEditor() {
  const containerRef = useRef(null);

  const initialValue = [
    {
      type: 'h1',
      children: [
        {
          text: '🌳 Blocks',
        },
      ],
      id: '1',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Easily create headings of various levels, from H1 to H6, to structure your content and make it more organized.',
        },
      ],
      id: '2',
    },
    {
      type: 'blockquote',
      children: [
        {
          text: 'Create blockquotes to emphasize important information or highlight quotes from external sources.',
        },
      ],
      id: '3',
    },
    {
      type: 'code_block',
      lang: 'javascript',
      children: [
        {
          type: 'code_line',
          children: [
            {
              text: '// Use code blocks to showcase code snippets',
            },
          ],
        },
        {
          type: 'code_line',
          children: [
            {
              text: 'function greet() {',
            },
          ],
        },
        {
          type: 'code_line',
          children: [
            {
              text: "  console.info('Hello World!');",
            },
          ],
        },
        {
          type: 'code_line',
          children: [
            {
              text: '}',
            },
          ],
        },
      ],
      id: '4',
    },
    {
      type: 'media_embed',
      url: 'https://instagram.com/p/CUbHfhpswxt/?utm_source=ig_embed&amp;utm_campaign=loading',
      children: [
        {
          text: '',
        },
      ],
      id: 'ornud',
      width: 338,
    },
    {
      type: 'h1',
      children: [
        {
          text: '🌱 Marks',
        },
      ],
      id: '1',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Add style and emphasis to your text using the mark plugins, which offers a variety of formatting options.',
        },
      ],
      id: '2',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Make text ',
        },
        {
          text: 'bold',
          bold: true,
        },
        {
          text: ', ',
        },
        {
          text: 'italic',
          italic: true,
        },
        {
          text: ', ',
        },
        {
          text: 'underlined',
          underline: true,
        },
        {
          text: ', or apply a ',
        },
        {
          text: 'combination',
          bold: true,
          italic: true,
          underline: true,
        },
        {
          text: ' of these styles for a visually striking effect.',
        },
      ],
      id: '3',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Add ',
        },
        {
          text: 'strikethrough',
          strikethrough: true,
        },
        {
          text: ' to indicate deleted or outdated content.',
        },
      ],
      id: '4',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Write code snippets with inline ',
        },
        {
          text: 'code',
          code: true,
        },
        {
          text: ' formatting for easy readability.',
        },
      ],
      id: '5',
    },
    {
      type: 'p',
      children: [
        {
          text: 'Press ',
        },
        {
          text: '⌘+B',
          kbd: true,
        },
        {
          text: ' to apply bold mark or ',
        },
        {
          text: '⌘+I',
          kbd: true,
        },
        {
          text: ' for italic mark.',
        },
      ],
      id: '6',
    },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <CommentsProvider users={commentsUsers} myUserId={myUserId}>
        <Plate
          plugins={plugins}
          initialValue={initialValue}
          // onChange={(e) => console.log(e)}
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
              <FixedToolbar>
                <FixedToolbarButtons />
              </FixedToolbar>

              <Editor
                className="px-[96px] py-16"
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
