import React, { FC, memo } from 'react';
import { Grid } from 'semantic-ui-react';
import { PATH_PRIVACY, PATH_TERMS } from '@constants/routes.constants';
import SocialLogin from './SocialLogin';
import EmailLogin from './EmailLogin';
import WalletLogin from './WalletLogin';
import styles from './styles.module.scss';

const MainPage: FC = () => (
  <div className={styles.wrapper}>
    <Grid stackable columns={2} verticalAlign="middle">
      <Grid.Column width={9}>
        <div className={styles.imageContainer}>
          <img src="/images/home-page/logo.png" alt="logo" />
        </div>
      </Grid.Column>
      <Grid.Column width={7} className={styles.padding0}>
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
              <div>
                <p>Secured by</p>
                <img src="/images/home-page/web3auth-logo.png" alt="web3auth-logo" />
              </div>
            </div>
          </div>
        </div>
      </Grid.Column>
    </Grid>
  </div>
);

export default memo(MainPage);
