import React, { memo } from 'react';
import { MenuItem } from 'semantic-ui-react';
import Link from 'next/link';
import Menu from '@components/Menu';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import Popup from '@components/Popup';
import { TOP_MENU_LIST } from './constants';
import Balance from './Balance';
import styles from './styles.module.scss';

const Header = () => (
  <Menu className={styles.header}>
    <div className={styles.leftContainer}>
      <Icon
        width={143}
        height={40}
        className={styles.logoContainer}
        type={ICONS.UFORIKA_LOGO}
      />
      {TOP_MENU_LIST.map(({ href, label, disabled }) => (
        disabled
          ? (
            <Popup
              key={label}
              trigger={(
                <MenuItem disabled={disabled}>
                  {label}
                </MenuItem>
              )}
              position="bottom left"
              content="Soon"
            />
          ) : (
            <Link key={label} href={href}>
              <MenuItem>
                {label}
              </MenuItem>
            </Link>
          )
      ))}
    </div>
    <div className={styles.rightContainer}>
      <Balance />
      <div className={styles.userAvatar}>
        <img src="/images/user/user-image.png" alt="user avatar" />
      </div>
    </div>
  </Menu>
);

export default memo(Header);
