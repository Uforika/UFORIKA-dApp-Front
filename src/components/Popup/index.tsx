import React, { FC, memo } from 'react';
import { Popup as UIPopup, StrictPopupProps } from 'semantic-ui-react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = Omit<StrictPopupProps, 'inverted' | 'basic'>;

const Popup: FC<Props> = ({ className, ...props }) => (
  <UIPopup className={cn(styles.wrap, className)} {...props} />
);

export default memo(Popup);
