import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { MenuItem, Sidebar as UISidebar } from 'semantic-ui-react';
import { useWallet } from '@hooks/wallet.hooks';
import Menu from '@components/Menu';
import Link from '@components/Link';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { LEFT_MENU_LIST } from './constants';
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
        {LEFT_MENU_LIST.map(({ href, label, icon }) => (
          <Link key={label} href={href}>
            <MenuItem
              key={label}
              onClick={handleMenuItem(href)}
              active={isActiveTab(href)}
              href={href}
            >
              <span className={styles.icon}>
                <Icon width={20} type={icon} />
              </span> {label}
            </MenuItem>
          </Link>
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
