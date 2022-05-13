import React, { FC, memo } from 'react';
import Button from '@components/Button';
import Modal from '../../components/Modal';
import { ReactComponent as IconSuccess } from './assets/success.svg';
import styles from './styles.module.scss';

type Props = {
  text: string;
  confirmText?: string,
  onConfirm?: () => void;
  onClose: () => void;
}

const ModalSuccess: FC<Props> = ({
  onClose, onConfirm, text, confirmText, ...props
}) => {
  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  return (
    <Modal {...props} size="tiny" onClose={onClose}>
      <div className={styles.shadow} />
      <div className={styles.background} />
      <div className={styles.content}>
        <IconSuccess className={styles.icon} />
        <h2 className={styles.text}>{text}</h2>
        <div className={styles.panel}>
          <Button size="medium" secondary onClick={handleConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

ModalSuccess.defaultProps = {
  confirmText: 'OK',
  onConfirm: undefined,
};

export default memo(ModalSuccess);
