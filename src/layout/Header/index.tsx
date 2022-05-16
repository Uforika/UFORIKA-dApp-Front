import React, { memo } from 'react';
import { Menu } from 'semantic-ui-react';
import { ReactComponent as LogoIcon } from '@assets/images/logo.svg';
import styles from './styles.module.scss';

const Header = () => (
  <Menu className={styles.header}>
    <div className={styles.logoContainer}>
      <LogoIcon viewBox="0 0 158 44" />
    </div>
  </Menu>
);

export default memo(Header);
