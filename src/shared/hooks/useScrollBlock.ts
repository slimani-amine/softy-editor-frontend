import { useRef } from 'react';

const safeDocument: Document = document;

/**
 * Usage:
 * const [blockScroll, allowScroll] = useScrollBlock();
 */
export const useScrollBlock = (): [() => void, () => void] => {
  const scrollBlocked = useRef(false);

  const editorContainer: any = document.querySelector('.blockScrollMain');
  const blockScroll = (): void => {
    if (document === undefined || editorContainer === null) return;

    editorContainer.style.overflow = 'hidden';
    editorContainer.style.paddingRight = '14px';
    scrollBlocked.current = true;
  };

  const allowScroll = (): void => {
    if (document === undefined || editorContainer === null) return;

    editorContainer.style.overflow = 'auto';
    editorContainer.style.paddingRight = '0px';

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};
