import React, { memo } from 'react';
import { useFailModal, useSuccessModal } from '@hooks/modals.hooks';
import styles from './UiKitModals.module.scss';

const UiKitModals = () => {
  const [showSuccessModal] = useSuccessModal('TEST', () => null);
  const [showFailModal] = useFailModal('TEST', () => null);

  return (
    <div className={styles.wrap}>
      <h2>Modals</h2>
      <button onClick={showFailModal}>Modal Fail</button>
      <br />
      <button onClick={showSuccessModal}>Modal Success</button>
      <br />
    </div>
  );
};

export default memo(UiKitModals);
