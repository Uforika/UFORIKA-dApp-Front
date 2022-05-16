import React, { FC, memo } from 'react';
import { Popup as UIPopup, StrictPopupProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = Omit<StrictPopupProps, 'inverted' | 'basic'>;

const Popup: FC<Props> = ({ ...props }) => (
  <UIPopup className={styles.wrap} {...props} />
);

export default memo(Popup);
