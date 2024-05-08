import { useEffect, useState } from 'react';

import { CoverImageModal } from 'shared/components/modals/cover-image-modal';
import { SettingsModal } from 'shared/components/modals/settings-modal';

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
