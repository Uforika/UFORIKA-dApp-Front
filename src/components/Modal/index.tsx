import React, { FC, memo } from 'react';
import classNames from 'classnames';
import { Modal as UIModal, StrictModalProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = StrictModalProps & {
  onClose?: () => void
}

type ModalSizes = 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen'

const Modal: FC<Props> = ({
  children,
  onClose,
  size,
  ...props
}) => (
  <UIModal
    open
    size={size}
    className={classNames(styles.modal, { [styles[size as ModalSizes]]: size })}
    onClose={onClose}
    {...props}
  >
    <div className={styles.content}>{children}</div>
  </UIModal>
);

Modal.defaultProps = {
  onClose: () => null,
};

export default memo(Modal);
