import React, { FC } from 'react';
import { Modal } from 'semantic-ui-react';
import { StrictModalProps } from 'semantic-ui-react/dist/commonjs/modules/Modal/Modal';
import cn from 'classnames';
import { CloseIcon } from '@constants/icons.constants';
import styles from './styles.module.scss';

type Props = StrictModalProps & {
  title?: string
  onClose?: () => void
  className?: string,
  contentClassName?: string,
  text?: string,
  withHeader?: boolean,
}

const ModalWrap: FC<Props> = ({
  title,
  children,
  onClose,
  className,
  contentClassName,
  text,
  withHeader,
  ...props
}) => (
  <Modal
    open
    className={cn(styles.modal, className)}
    onClose={onClose}
    {...props}
  >
    {withHeader && (
      <div className={styles.header}>
        <button onClick={onClose} className={styles.closeButton}>{CloseIcon}</button>
        <h3 className={styles.title}>{title}</h3>
      </div>
    )}
    {text && <div className={styles.text}>{text}</div>}
    <div className={cn(styles.content, contentClassName)}>{children}</div>
  </Modal>
);

ModalWrap.defaultProps = {
  title: '',
  text: '',
  className: '',
  contentClassName: '',
  withHeader: true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
};

export default ModalWrap;
