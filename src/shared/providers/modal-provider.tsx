import { useEffect, useState } from 'react';

import { SettingsModal } from 'shared/components/modals/settings-modal';
import { CoverImageModal } from 'shared/components/modals/cover-image-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
