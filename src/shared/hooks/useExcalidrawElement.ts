import React from 'react';
import {
  ExcalidrawImperativeAPI,
  LibraryItems,
} from '@excalidraw/excalidraw/types/types';
import {
  TExcalidrawElement,
  TExcalidrawProps,
} from '@udecode/plate-excalidraw';

export const useExcalidrawElement = ({
  element,
  libraryItems = [],
  scrollToContent = true,
}: {
  element: TExcalidrawElement;
  scrollToContent?: boolean;
  libraryItems?: LibraryItems;
}) => {
  const [Excalidraw, setExcalidraw] = React.useState<any>(null);
  React.useEffect(() => {
    import('@excalidraw/excalidraw').then((comp) =>
      setExcalidraw(comp.Excalidraw),
    );
  });

  const _excalidrawRef = React.useRef<ExcalidrawImperativeAPI>(null);

  const excalidrawProps: any = {
    excalidrawRef: _excalidrawRef,
    initialData: {
      elements: element.data?.elements,
      appState: element.data?.state,
      scrollToContent,
      libraryItems,
    },
    autoFocus: false,
  };

  return {
    Excalidraw,
    excalidrawProps,
  };
};
