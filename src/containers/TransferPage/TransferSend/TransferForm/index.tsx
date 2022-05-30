import React, {
  ChangeEvent, FC, memo, useCallback,
} from 'react';
import Header from '@components/Header';
import Input from '@components/Input';
import DropdownCurrency from 'src/modules/DropdownCurrency';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import { DropdownCurrencyItemType } from 'src/modules/DropdownCurrency/types';
import { TOKEN } from '@constants/token.constants';
import { roundToBase } from '@helpers/number.helper';
import styles from './styles.module.scss';

type SendFormErrorsType = {
  to?: string | undefined
  amount?: string | undefined
}

type Props = {
  errors: SendFormErrorsType,
  currencyOptions: DropdownCurrencyItemType[],
  amount?: string,
  onChangeAmount: (value: string) => void,
  onSubmit: (value?: boolean) => void,
  to?: string,
  changeTo: (value: string) => void,
  fee: string,
  onSelectOption: (id: TOKEN) => void
  activeOptionId: string | null
  totalAmount: string
}

const TransferForm: FC<Props> = ({
  onSubmit,
  onChangeAmount,
  currencyOptions,
  amount,
  to,
  changeTo,
  fee,
  errors,
  onSelectOption,
  activeOptionId,
  totalAmount,
}) => {
  const handleSubmit = useCallback(() => { onSubmit(); }, [onSubmit]);

  const handleChangeTo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    changeTo(event.target.value);
  }, [changeTo]);

  const { amount: amountError, to: toError } = errors;

  return (
    <>
      <Header as="h3">Send</Header>
      <div className={styles.fields}>
        <div className={styles.field}>
          <Input
            name="sendTransaction"
            label="To"
            placeholder="Wallet address"
            size="big"
            value={to}
            onChange={handleChangeTo}
            error={toError}
          />
        </div>
        <div className={styles.field}>
          <DropdownCurrency
            pattern="^[0-9]*\.?[0-9]*$"
            name="sendTransactionDropdown"
            label="Amount"
            options={currencyOptions}
            panelText="Send All"
            onChange={onChangeAmount}
            value={amount}
            size="big"
            placeholder="0.00"
            errorMessage={amountError}
            onSelectOption={onSelectOption}
            activeOptionId={activeOptionId}
          />
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.row}>
          <span className={styles.key}>Transaction fee:</span>
          <span className={styles.value}>{fee} MATIC</span>
        </div>
        <div className={styles.row}>
          <span className={styles.key}>Total amount:</span>
          <span className={styles.value}>{roundToBase(totalAmount)} $</span>
        </div>
      </div>
      <div className={styles.button}>
        <Button onClick={handleSubmit} primary disabled={!amount || !to}>Transfer</Button>
      </div>
      <div className={styles.hintRow}>
        <Icon width={16} type={ICONS.PROFILE_POLYGON_POWERED} />
        <span className={styles.hint}>Supported by Polygon</span>
      </div>
    </>
  );
};

TransferForm.defaultProps = {
  amount: undefined,
  to: undefined,
};

export default memo(TransferForm);
