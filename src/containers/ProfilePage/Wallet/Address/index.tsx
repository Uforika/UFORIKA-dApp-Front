import React, { FC, memo, useCallback } from 'react';
import { useWallet } from '@hooks/wallet.hooks';
import { useQrCodeModal } from '@hooks/modals.hooks';
import Popup from '@components/Popup';
import { ICONS } from '@components/Icon/constants';
import ButtonIcon from '@components/ButtonIcon';
import { copy } from '@helpers/copy.helper';
import { TOAST_MASSAGE_SUCCESS } from '@constants/messages.constants';
import styles from './styles.module.scss';

const Address: FC = () => {
  const { address } = useWallet();

  const [showModal] = useQrCodeModal(address);

  const handleCopy = useCallback(() => {
    copy(address, TOAST_MASSAGE_SUCCESS.COPY);
  }, [address]);

  return (
    <div className={styles.card}>
      <div>
        <p className={styles.address}>{address}</p>
      </div>
      <div className={styles.panel}>
        <Popup
          trigger={(
            <ButtonIcon
              onClick={handleCopy}
              width={24}
              type={ICONS.COPY}
            />
          )}
          content="Copy"
          position="bottom left"
        />
        <Popup
          trigger={(
            <ButtonIcon
              onClick={showModal}
              width={24}
              type={ICONS.QR_CODE}
            />
          )}
          position="bottom left"
          content="QR code"
        />
      </div>
    </div>
  );
};

export default memo(Address);
