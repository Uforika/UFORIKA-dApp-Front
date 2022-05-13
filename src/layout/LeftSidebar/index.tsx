import React, {
  FunctionComponent, memo, SVGProps, useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { MenuItem, Sidebar } from 'semantic-ui-react';
import {
  MENU_LIST_AUTH,
} from '@constants/routes.constants';
import useWallet from '@hooks/wallet';
import Menu from '@components/Menu';
import { ReactComponent as LogoutIcon } from '@assets/images/icons/menu/logout.svg';
import styles from './styles.module.scss';

const LeftSidebar = () => {
  const router = useRouter();

  const { walletLogout } = useWallet();

  const isActiveTab = useCallback((tabLink: string) => tabLink === router.pathname, [router.pathname]);

  const getIcon = (Icon: FunctionComponent<SVGProps<SVGSVGElement>>) => <Icon />;

  const handleMenuItem = (href: string) => () => {
    router.push(href).catch(() => null);
  };

  return (
    <Sidebar
      as={Menu}
      visible
      pointing
      vertical
      className={styles.leftSidebar}
    >
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
    </Sidebar>
  );
};

export default memo(LeftSidebar);
