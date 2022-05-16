import React, {
  FunctionComponent, memo, SVGProps, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { MenuItem, Sidebar as UISidebar } from 'semantic-ui-react';
import {
  MENU_LIST_AUTH,
} from '@constants/routes.constants';
import useWallet from '@hooks/wallet';
import Menu from '@components/Menu';
import { ReactComponent as LogoutIcon } from '@assets/images/icons/menu/logout.svg';
import styles from './styles.module.scss';

const Sidebar = () => {
  const router = useRouter();

  const { walletLogout } = useWallet();

  const isActiveTab = useCallback((tabLink: string) => tabLink === router.pathname, [router.pathname]);

  const getIcon = (Icon: FunctionComponent<SVGProps<SVGSVGElement>>) => <Icon />;

  const handleMenuItem = (href: string) => () => {
    router.push(href).catch(() => null);
  };

  return (
    <UISidebar
      visible
      className={styles.leftSidebar}
    >
      <Menu vertical pointing>
        <ul className={styles.menuList}>
          {MENU_LIST_AUTH.map(({ href, label, icon }) => (
            <MenuItem
              onClick={handleMenuItem(href)}
              key={label}
              active={isActiveTab(href)}
            >
              {getIcon(icon)} {label}
            </MenuItem>
          ))}
        </ul>

        <MenuItem onClick={walletLogout}>
          <LogoutIcon /> Log out
        </MenuItem>
      </Menu>
    </UISidebar>
  );
};

export default memo(Sidebar);
