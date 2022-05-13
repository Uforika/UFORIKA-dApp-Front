import React, { memo } from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import { ReactComponent as LogoIcon } from '@assets/images/logo.svg';
import styles from './styles.module.scss';

const TopSidebar = () => (
  <Sidebar
    as={Menu}
    visible
    direction="top"
    className={styles.topSidebar}
  >
    <div className={styles.logoContainer}>
      <LogoIcon viewBox="0 0 158 44" />
    </div>
  </Sidebar>
);

export default memo(TopSidebar);
