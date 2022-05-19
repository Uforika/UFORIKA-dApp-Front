import React, { FC, memo } from 'react';
import { Header as UIHeader, StrictHeaderProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

const Header: FC<StrictHeaderProps> = ({ ...props }) => (
  <span className={styles.root}>
    <UIHeader {...props} />
  </span>
);

export default memo(Header);
