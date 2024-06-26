import React from 'react';
import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
} from '@udecode/plate-basic-marks';
import { useEditorReadOnly } from '@udecode/plate-common';

import { Icons, iconVariants } from 'shared/components/icons';
import { CommentToolbarButton } from 'shared/components/plate-ui/comment-toolbar-button';
import { LinkToolbarButton } from 'shared/components/plate-ui/link-toolbar-button';

import { MarkToolbarButton } from './mark-toolbar-button';
import { MoreDropdownMenu } from './more-dropdown-menu';
import { TurnIntoDropdownMenu } from './turn-into-dropdown-menu';
import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { ColorDropdownMenu } from './color-dropdown-menu';
import { AlignDropdownMenu } from './align-dropdown-menu';
import { LineHeightDropdownMenu } from './line-height-dropdown-menu';
import { IndentListToolbarButton } from './indent-list-toolbar-button';
import { ListStyleType } from '@udecode/plate-indent-list';
import { OutdentToolbarButton } from './outdent-toolbar-button';
import { IndentToolbarButton } from './indent-toolbar-button';

export function FloatingToolbarButtons() {
  const readOnly = useEditorReadOnly();

  return (
    <>
      {!readOnly && (
        <>
          <TurnIntoDropdownMenu />

          <MarkToolbarButton nodeType={MARK_BOLD} tooltip="Bold (⌘+B)">
            <Icons.bold />
          </MarkToolbarButton>
          <MarkToolbarButton nodeType={MARK_ITALIC} tooltip="Italic (⌘+I)">
            <Icons.italic />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_UNDERLINE}
            tooltip="Underline (⌘+U)"
          >
            <Icons.underline />
          </MarkToolbarButton>
          <MarkToolbarButton
            nodeType={MARK_STRIKETHROUGH}
            tooltip="Strikethrough (⌘+⇧+M)"
          >
            <Icons.strikethrough />
          </MarkToolbarButton>

          <ColorDropdownMenu nodeType={MARK_COLOR} tooltip="Text Color">
            <Icons.color className={iconVariants({ variant: 'toolbar' })} />
          </ColorDropdownMenu>
          <ColorDropdownMenu nodeType={MARK_BG_COLOR} tooltip="Highlight Color">
            <Icons.bg className={iconVariants({ variant: 'toolbar' })} />
          </ColorDropdownMenu>

          <AlignDropdownMenu />

          <LineHeightDropdownMenu />

          <IndentListToolbarButton nodeType={ListStyleType.Disc} />
          <IndentListToolbarButton nodeType={ListStyleType.Decimal} />

          <OutdentToolbarButton />
          <IndentToolbarButton />

          <MarkToolbarButton nodeType={MARK_CODE} tooltip="Code (⌘+E)">
            <Icons.code />
          </MarkToolbarButton>

          <LinkToolbarButton />
        </>
      )}

      <CommentToolbarButton />

      <MoreDropdownMenu />
    </>
  );
}
