import React, { memo } from 'react';
import { useFailModal, useSuccessModal } from '@hooks/modals.hooks';
import Header from '@components/Header';
import styles from './styles.module.scss';

const UiKitModals = () => {
  const [showSuccessModal] = useSuccessModal('TEST', () => null);
  const [showFailModal] = useFailModal('TEST', () => null);

  return (
    <div className={styles.wrap}>
      <Header className={styles.title} as="h2">Modals</Header>
      <button onClick={showFailModal}>Modal Fail</button>
      <br />
      <button onClick={showSuccessModal}>Modal Success</button>
      <br />
    </div>
  );
};

export default memo(UiKitModals);
