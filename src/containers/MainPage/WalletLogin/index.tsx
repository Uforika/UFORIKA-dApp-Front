import React, { FC, memo } from 'react';
import Button from '@components/Button';
import { useWallet } from '@hooks/wallet.hooks';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import { LOGIN_PROVIDER } from '@constants/wallets.constants';
import styles from './styles.module.scss';

const WalletLogin: FC = () => {
  const { walletAuth } = useWallet();

  const handleWalletAuthorization = () => {
    walletAuth(LOGIN_PROVIDER.METAMASK, undefined).catch(() => null);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Wallet</p>
      <Button
        onClick={handleWalletAuthorization}
        size="medium"
        secondary
      >
        Connect with Metamask
        <span className={styles.icon}><Icon width={20} type={ICONS.LOGIN_METAMASK} /></span>
      </Button>
    </div>
  );
};

export default memo(WalletLogin);
