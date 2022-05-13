import React, { FC, memo } from 'react';
import Button from '@components/Button';
import { ReactComponent as MetamaskIcon } from '@assets/images/icons/wallet/metamask.svg';
import useWallet from '@hooks/wallet';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
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
        Connect with Metamask <MetamaskIcon />
      </Button>
    </div>
  );
};

export default memo(WalletLogin);
