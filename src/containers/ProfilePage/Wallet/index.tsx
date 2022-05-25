import React, { FC, memo } from 'react';
import { useRouter } from 'next/router';
import { ICONS } from '@components/Icon/types';
import Button from '@components/Button';
import Icon from '@components/Icon';
import Address from '@containers/ProfilePage/Wallet/Address';
import { useBalance } from '@hooks/wallet.hooks';
import { useCurrencyConversion } from '@hooks/currency-conversion.hooks';
import { CURRENCY, TOKEN } from '@constants/token.constants';
import { PATH_HISTORY, PATH_TRANSFER } from '@constants/routes.constants';
import { FORA_NAME, MATIC_NAME } from '@constants/global.constants';
import styles from './styles.module.scss';
import Card from './Card';

const Wallet: FC = () => {
  const router = useRouter();
  const balanceFora = useBalance(TOKEN.FORA);
  const balancePolygon = useBalance(TOKEN.POLYGON);
  const balanceForaUsd = useCurrencyConversion(TOKEN.FORA, CURRENCY.USD, balanceFora);
  const balancePolygonUsd = useCurrencyConversion(TOKEN.POLYGON, CURRENCY.USD, balancePolygon);

  const handleButtonLink = (href: string) => () => {
    router?.push(href);
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>My wallet</h3>
      <div className={styles.content}>
        <div className={styles.grid}>
          <Card color="#00FF44" name={FORA_NAME} logo={ICONS.FORA_COIN_LOGO} count={balanceFora} usdPrice={balanceForaUsd} />
          <Card color="#B18CEF" name={MATIC_NAME} logo={ICONS.MATIC_COIN_LOGO} count={balancePolygon} usdPrice={balancePolygonUsd} />
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
