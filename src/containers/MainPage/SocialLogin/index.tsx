import React, { FC, memo, useState } from 'react';
import cn from 'classnames';
import useWallet from '@hooks/wallet';
import Button from '@components/Button';
import { LOGIN_PROVIDER } from '@helpers/wallets.helper';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import { SOCIAL_LOGIN } from './constants';
import styles from './styles.module.scss';

const SocialLogin: FC = () => {
  const { walletAuth } = useWallet();
  const [isShowMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!isShowMore);
  };

  const handlePressAuthorization = (provider: LOGIN_PROVIDER) => async () => {
    await walletAuth(provider, undefined);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Social</p>
      <div className={styles.container}>
        <ul className={styles.list}>
          {SOCIAL_LOGIN.map(({ provider, icon }, index) => index < 5 && (
            <li className={cn(styles.item, styles.icon)} key={provider}>
              <Button
                onClick={handlePressAuthorization(provider)}
                secondary
                className={styles.button}
              >
                <Icon type={icon} />
              </Button>
            </li>
          ))}
        </ul>
        <button className={styles.buttonMore} type="button" onClick={handleShowMore}>
          <Icon width={28} type={ICONS.LOGIN_MORE} />
        </button>
      </div>
    </div>
  );
};

export default memo(SocialLogin);
