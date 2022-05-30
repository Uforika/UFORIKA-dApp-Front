import React, { FC, memo } from 'react';
import Modal from '@components/Modal';
import styles from './styles.module.scss';

type Props = {
  text: string;
  onSuccess?: () => void;
  onFailure?: () => void;
  onClose: () => void;
}

const ModalConfirm: FC<Props> = ({
  onClose, onFailure, onSuccess, text, ...props
}) => {
  const handleCancel = () => {
    if (onFailure) {
      onFailure();
    }
    onClose();
  };

  const handleConfirm = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  return (
    <Modal size="small" {...props} onClose={onClose}>
      <h3 className={styles.text}>{text}</h3>
      <div className={styles.panel}>
        <button
          className={styles.success}
          onClick={handleConfirm}
        >Yes
        </button>
        <button
          className={styles.failure}
          onClick={handleCancel}
        >No
        </button>
      </div>
    </Modal>
  );
};

ModalConfirm.defaultProps = {
  onSuccess: undefined,
  onFailure: undefined,
};

export default memo(ModalConfirm);
