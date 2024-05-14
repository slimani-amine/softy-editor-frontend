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
  selectionExpanded,
  setWaitForCollapsedSelection,
  open,
  setOpen,
  focused,
  floating,
  ignoreReadOnly,
}: ReturnType<typeof useFloatingToolbarState>) => {
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
