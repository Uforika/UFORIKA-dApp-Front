import React, { FC, memo } from 'react';
import { FORA_NAME, MATIC_NAME } from '@constants/global.constants';
import { ICONS } from '@components/Icon/types';
import Address from '@containers/ProfilePage/Wallet/Address';
import Button from '@components/Button';
import { PATH_HISTORY, PATH_TRANSFER } from '@constants/routes.constants';
import { useRouter } from 'next/router';
import Icon from '@components/Icon';
import styles from './styles.module.scss';
import Card from './Card';

const Wallet: FC = () => {
  const router = useRouter();
  const handleButtonLink = (href: string) => () => {
    router?.push(href);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>My wallet</h3>
      <div className={styles.content}>
        <div className={styles.grid}>
          <Card color="#00FF44" name={FORA_NAME} logo={ICONS.FORA_COIN_LOGO} count={10000} usdPrice={0} />
          <Card color="#B18CEF" name={MATIC_NAME} logo={ICONS.MATIC_COIN_LOGO} count={0} usdPrice={0} />
          <Address />
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.buttons}>
            <div className={styles.buttonContainer}>
              <Button onClick={handleButtonLink(PATH_TRANSFER)} primary size="medium">Transfer</Button>
            </div>
            <div className={styles.buttonContainer}>
              <Button onClick={handleButtonLink(PATH_HISTORY)} secondary size="medium">Transaction history</Button>
            </div>
          </div>
          <div className={styles.supported}>
            <Icon width={16} type={ICONS.PROFILE_POLYGON_POWERED} /> Supported by Polygon<span>Benefits</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Wallet);
