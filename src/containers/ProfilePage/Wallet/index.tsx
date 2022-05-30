import React, { FC, memo } from 'react';
import Address from '@containers/ProfilePage/Wallet/Address';
import { ICONS } from '@components/Icon/constants';
import { useRouter } from 'next/router';
import Button from '@components/Button';
import Icon from '@components/Icon';
import LinkButton from '@components/LinkButton';
import Section from '@components/Section';
import { useBalance } from '@hooks/wallet.hooks';
import { useCurrencyConversion } from '@hooks/currency-conversion.hooks';
import { FORA_NAME, MATIC_NAME } from '@constants/global.constants';
import { CURRENCY, TOKEN } from '@constants/token.constants';
import { PATH_BENEFITS, PATH_HISTORY, PATH_TRANSFER } from '@constants/routes.constants';
import Header from '@components/Header';
import Card from './Card';
import styles from './styles.module.scss';

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
      <Header className={styles.title} as="h3">My wallet</Header>
      <Section className={styles.section}>
        <div className={styles.grid}>
          <Card color="#00FF44" name={FORA_NAME} logo={ICONS.COIN_FORA} count={balanceFora} usdPrice={balanceForaUsd} />
          <Card color="#B18CEF" name={MATIC_NAME} logo={ICONS.COIN_MATIC} count={balancePolygon} usdPrice={balancePolygonUsd} />
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
            <Icon width={16} type={ICONS.PROFILE_POLYGON_POWERED} /> Supported by Polygon
            <a href={PATH_BENEFITS} target="_blank" rel="noreferrer">
              <LinkButton className={styles.button}>
                Benefits
              </LinkButton>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
};
export default memo(Wallet);
