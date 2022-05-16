import React, { FC, memo } from 'react';
import { PATH_PRIVACY, PATH_TERMS } from '@constants/routes.constants';
import { ICONS } from '@components/Icon/types';
import Icon from '@components/Icon';
import SocialLogin from './SocialLogin';
import EmailLogin from './EmailLogin';
import WalletLogin from './WalletLogin';
import styles from './styles.module.scss';

const MainPage: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.imageContainer}>
      <img src="/images/home-page/logo.png" alt="logo" />
    </div>
    <div className={styles.card}>
      <div className={styles.grid}>
        <div className={styles.header}>
          <h1 className={styles.title}>Let’s get started</h1>
          <p className={styles.description}>Select one of the following to continue</p>
        </div>
        <SocialLogin />
        <EmailLogin />
        <WalletLogin />
        <div className={styles.footer}>
          <p className={styles.footerDescription}>
            By signing up with Uforika Inc., you accept the {' '}
            <a target="_blank" href={PATH_TERMS} rel="noreferrer">Terms & Conditions</a>
            {' '}and <a target="_blank" href={PATH_PRIVACY} rel="noreferrer">Privacy Policy</a>.
          </p>
          <div className={styles.secured}>
            <p>Secured by</p>
            <Icon width={96} height={18} type={ICONS.WEB3_AUTH_LOGO} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default memo(MainPage);
