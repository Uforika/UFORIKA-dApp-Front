import React, { FC, memo, useCallback } from 'react';
import { useWallet } from '@hooks/wallet.hooks';
import { useQrCodeModal } from '@hooks/modals.hooks';
import Popup from '@components/Popup';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { copy } from '@helpers/copy.helper';
import styles from './styles.module.scss';

const Address: FC = () => {
  const { address } = useWallet();

  const [showModal] = useQrCodeModal(address);

  const handleCopy = useCallback(() => {
    copy(address);
  }, [address]);

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.address}>{address}</p>
      </div>
      <div>
        <Popup
          trigger={(
            <button onClick={handleCopy} className={styles.button}>
              <Icon width={24} type={ICONS.PROFILE_COPY} />
            </button>
          )}
          content="Copy"
          position="bottom left"
        />
        <Popup
          trigger={(
            <button onClick={showModal}>
              <Icon width={24} type={ICONS.PROFILE_QR_CODE} />
            </button>
          )}
          position="bottom left"
          content="QR code"
        />
      </div>
    </div>
  );
};

export default memo(Address);
