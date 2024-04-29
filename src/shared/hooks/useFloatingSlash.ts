import React from 'react';
import {
  getSelectionText,
  isSelectionExpanded,
  mergeProps,
  useEditorSelector,
  useEventEditorSelectors,
  usePlateSelectors,
} from '@udecode/plate-common';
import {
  getSelectionBoundingClientRect,
  useVirtualFloating,
  UseVirtualFloatingOptions,
} from '@udecode/plate-floating';
import { set } from 'date-fns';
import { useFocused } from 'slate-react';
import { useScrollBlock } from './useScrollBlock';

export type FloatingToolbarState = {
  floatingOptions?: UseVirtualFloatingOptions;
  ignoreReadOnly?: boolean;
  hideToolbar?: boolean;
};

export const useFloatingToolbarState = ({
  floatingOptions,
  hideToolbar,
  ignoreReadOnly,
}: FloatingToolbarState) => {
  const editorId = usePlateSelectors().id();
  const selectionExpanded = useEditorSelector(isSelectionExpanded, []);
  const selectionText = useEditorSelector(getSelectionText, []);

  const focusedEditorId = useEventEditorSelectors.focus();
  const focused = useFocused();

  const [open, setOpen] = React.useState(false);
  const [waitForCollapsedSelection, setWaitForCollapsedSelection] =
    React.useState(false);

  const floating = useVirtualFloating(
    mergeProps(
      {
        getBoundingClientRect: getSelectionBoundingClientRect,
        open,
        onOpenChange: setOpen,
      },
      floatingOptions,
    ),
  );

  return {
    editorId,
    open,
    setOpen,
    waitForCollapsedSelection,
    setWaitForCollapsedSelection,
    selectionExpanded,
    selectionText,
    focused,
    focusedEditorId,
    ignoreReadOnly,
    hideToolbar,
    floating,
  };
};

export const useFloatingToolbar = ({
  editorId,
  selectionExpanded,
  selectionText,
  waitForCollapsedSelection,
  setWaitForCollapsedSelection,
  open,
  setOpen,
  focused,
  focusedEditorId,
  floating,
  ignoreReadOnly,
  hideToolbar,
}: ReturnType<typeof useFloatingToolbarState>) => {
  // On refocus, the editor keeps the previous selection,
  // so we need to wait it's collapsed at the new position before displaying the floating toolbar.
  const [blockScroll, allowScroll] = useScrollBlock();

  React.useEffect(() => {
    if (!focused || ignoreReadOnly) {
      setWaitForCollapsedSelection(true);
    }

    if (!selectionExpanded) {
      setWaitForCollapsedSelection(false);
    }
  }, [
    focused,
    ignoreReadOnly,
    selectionExpanded,
    setWaitForCollapsedSelection,
  ]);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !open) {
        setOpen(true);
      } else {
        setOpen(false);
        allowScroll();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, setOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target) {
        setOpen(false);
        allowScroll();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [floating, setOpen]);

  return {
    ref: floating.refs.setFloating,
    props: {
      style: floating.style,
    },
    hidden: !open,
  };
};
