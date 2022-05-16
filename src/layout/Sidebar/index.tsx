import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MenuItem, Sidebar as UISidebar } from 'semantic-ui-react';
import useWallet from '@hooks/wallet';
import Menu from '@components/Menu';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { MENU_LIST_AUTH } from './constants';
import styles from './styles.module.scss';

const Sidebar = () => {
  const router = useRouter();

  const { walletLogout } = useWallet();

  const isActiveTab = useCallback((tabLink: string) => tabLink === router.pathname, [router.pathname]);

  const handleMenuItem = (href: string) => () => {
    router.push(href).catch(() => null);
  };

  return (
    <UISidebar
      as={Menu}
      visible
      pointing
      vertical
      className={styles.sidebar}
    >
      <ul className={styles.menuList}>
        {MENU_LIST_AUTH.map(({ href, label, icon }) => (
          <MenuItem
            onClick={handleMenuItem(href)}
            key={label}
            active={isActiveTab(href)}
          >
            <span className={styles.icon}>
              <Icon width={20} type={icon} />
            </span> {label}
          </MenuItem>
        ))}
      </ul>

      <MenuItem onClick={walletLogout}>
        <span className={styles.icon}>
          <Icon width={20} type={ICONS.SIDEBAR_LOGOUT} />
        </span> Log out
      </MenuItem>
    </UISidebar>
  );
};

export default memo(Sidebar);
