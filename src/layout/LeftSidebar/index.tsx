import React, {
  FunctionComponent, memo, SVGProps, useCallback,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, Sidebar } from 'semantic-ui-react';
import {
  MENU_LIST_AUTH,
} from '@constants/routes.constants';
import useWallet from '@hooks/wallet';
import TabWithIcon from '@components/tabs/TabWithIcon';
import { ReactComponent as LogoutIcon } from '@assets/images/icons/menu/logout.svg';
import styles from './styles.module.scss';

const LeftSidebar = () => {
  const router = useRouter();

  const { walletLogout } = useWallet();

  const isActiveTab = useCallback((tabLink: string) => tabLink === router.pathname, [router.pathname]);

  const getIcon = (Icon: FunctionComponent<SVGProps<SVGSVGElement>>) => <Icon />;

  return (
    <Sidebar
      as={Menu}
      vertical
      visible
      className={styles.leftSidebar}
    >
      <ul className={styles.menuList}>
        {MENU_LIST_AUTH.map((menuItem) => (
          <li key={menuItem.label}>
            <Link href={menuItem.href}>
              <a>
                <TabWithIcon img={getIcon(menuItem.icon)} active={isActiveTab(menuItem.href)} label={menuItem.label} />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <TabWithIcon img={<LogoutIcon />} onClick={walletLogout} label="Log out" />
    </Sidebar>
  );
};

export default memo(LeftSidebar);
