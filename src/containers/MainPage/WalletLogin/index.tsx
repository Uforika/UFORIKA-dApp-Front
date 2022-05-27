import React, {
  FC, memo, useEffect, useState,
} from 'react';
import Button from '@components/Button';
import { useWallet } from '@hooks/wallet.hooks';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import { LOGIN_PROVIDER } from '@constants/wallets.constants';
import detectEthereumProvider from '@metamask/detect-provider';
import { useDOMContentLoaded } from '@hooks/dom.hooks';
import Popup from '@components/Popup';
import styles from './styles.module.scss';

const WalletLogin: FC = () => {
  const { walletAuth } = useWallet();
  const isDOMContentLoaded = useDOMContentLoaded();
  const [isHasMetamask, setHasMetamask] = useState<boolean | undefined>(undefined);

  const handleWalletAuthorization = () => {
    walletAuth(LOGIN_PROVIDER.METAMASK, undefined).catch(() => null);
  };

  const detectMetamask = async () => {
    const provider = await detectEthereumProvider();
    setHasMetamask(!!provider);
  };

  useEffect(() => {
    detectMetamask().catch(() => null);
  }, []);

  const isNotHasMetamaskExtension = typeof isHasMetamask === 'boolean' && !isHasMetamask;

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Wallet</p>
      <Popup
        position="bottom center"
        openOnTriggerMouseEnter={isNotHasMetamaskExtension}
        trigger={(
          <div>
            <Button
              onClick={handleWalletAuthorization}
              size="medium"
              secondary
              disabled={!isDOMContentLoaded || !isHasMetamask}
            >
              Connect with Metamask
              <span className={styles.icon}><Icon width={20} type={ICONS.LOGIN_METAMASK} /></span>
            </Button>
          </div>
        )}
        content={isNotHasMetamaskExtension
          ? 'For authorisation you need to install MetaMask https://metamask.io' : undefined}
      />
    </div>
  );
};

export default memo(WalletLogin);
