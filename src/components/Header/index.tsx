import React, { FC, memo } from 'react';
import cn from 'classnames';
import { Header as UIHeader, StrictHeaderProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

const Header: FC<StrictHeaderProps> = ({ className, ...props }) => (
  <span className={cn(styles.root, className)}>
    <UIHeader {...props} />
  </span>
);

export default memo(Header);
