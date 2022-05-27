import React, { FC, memo } from 'react';
import Button from '@components/Button';
import Header from '@components/Header';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import ButtonIcon from '@components/ButtonIcon';
import styles from './styles.module.scss';

type Props = {
  onCancel: (value?: boolean) => void
  confirmTransfer: () => void
  currencyIcon: ICONS
  amount: string | undefined
  token: string
  fee: string
  feeToken: string
  network: string
  from: string | null
  to: string
  isTransactionInProgress: boolean
}

const TransferConfirm: FC<Props> = ({
  amount, token, fee, feeToken, currencyIcon,
  from, to, onCancel, network, confirmTransfer,
  isTransactionInProgress,
}) => {
  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div className={styles.head}>
        <ButtonIcon onClick={handleCancel} width={24} type={ICONS.BACK} />
        <Header as="h3">Confirm details</Header>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Amount</p>
        <div className={styles.amount}>
          <Icon type={currencyIcon} width={20} />
          {`${amount || 0} ${token}`}
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Transaction Fee</p>
        <div className={styles.fee}>
          {`${fee} ${feeToken}`}
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>Network</p>
        <div className={styles.network}>
          {network}
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>From address</p>
        <div className={styles.from}>
          {from}
        </div>
      </div>

      <div className={styles.field}>
        <p className={styles.label}>To address</p>
        <div className={styles.to}>
          {to}
        </div>
      </div>

      <div className={styles.panel}>
        <Button onClick={confirmTransfer} primary>Confirm</Button>
        <Button disabled={isTransactionInProgress} onClick={handleCancel} secondary>Cancel</Button>
      </div>
    </>
  );
};

export default memo(TransferConfirm);
