import React, { FC, memo, useState } from 'react';
import Button from '@components/Button';
import Header from '@components/Header';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/types';
import Input from '@components/Input';
import DropdownCurrency from 'src/modules/DropdownCurrency';
// TODO: remove and use real data
import { currencyOptions } from 'src/pages/uikit/UiKitDropdowns/data';
import styles from './styles.module.scss';

type Props = {

}

const TransferSend: FC<Props> = () => {
  const [currencyValue, setCurrencyValue] = useState<string>();
  const handleChangeCurrencyValue = (value: string) => {
    setCurrencyValue(value);
  };

  return (
    <div className={styles.root}>
      <Header as="h3">Send</Header>
      <div className={styles.fields}>
        <div className={styles.field}>
          <Input
            name="sendTransaction"
            label="To"
            placeholder="Wallet address"
            size="big"
          />
        </div>
        <div className={styles.field}>
          <DropdownCurrency
            name="sendTransactionDropdown"
            label="Amount"
            options={currencyOptions}
            panelText="Send All"
            onChange={handleChangeCurrencyValue}
            value={currencyValue}
            size="big"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <span className={styles.key}>Transaction fee:</span>
          <span className={styles.value}>0.1 MATIC</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Total amount:</span>
          <span className={styles.value}>0 $</span>
        </div>
      </div>
      <div className={styles.button}>
        <Button primary>Transfer</Button>
      </div>
      <div className={styles.hintRow}>
        <Icon width={16} type={ICONS.PROFILE_POLYGON_POWERED} />
        <span className={styles.hint}>Supported by Polygon</span>
      </div>
    </div>
  );
};

export default memo(TransferSend);
