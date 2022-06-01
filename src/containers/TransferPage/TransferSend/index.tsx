import React, { FC, memo, useMemo } from 'react';
import Section from '@components/Section';
import { ICONS } from '@components/Icon/constants';
import { FORA_NAME } from '@constants/global.constants';
import {
  NETWORK_NAME, NETWORK_TOKEN_NAME, TOKEN, TOKEN_CONFIG,
} from '@constants/token.constants';
import { useBalance } from '@hooks/wallet.hooks';
import useDropdownCurrencySelection from '@hooks/dropdown-currency-selection.hook';
import { CONFIG } from '@constants/config.constants';
import { useSendForm } from './hooks/send-form.hook';
import { usePrepareTransfer } from './hooks/prepare-transfer.hook';
import { useTotalAmount } from './hooks/total-amount.hook';
import TransferForm from './TransferForm';
import TransferConfirm from './TransferConfirm';
import { getCurrencyOptions } from './helpers/transfer.helpers';
import styles from './styles.module.scss';

type Props = {
  address: string | null
}

const TransferSend: FC<Props> = ({ address }) => {
  const balanceFora = useBalance(TOKEN.FORA);
  const balancePolygon = useBalance(TOKEN.POLYGON);

  const currencyOptions = useMemo(() => getCurrencyOptions({
    balanceFora: balanceFora.toString(),
    balancePolygon: balancePolygon.toString(),
  }), [balanceFora, balancePolygon]);

  const { activeOptionId, onSelectOption } = useDropdownCurrencySelection(currencyOptions);
  const activeOption = useMemo(() => currencyOptions.find(({ id }) => id === activeOptionId), [currencyOptions, activeOptionId]);

  const {
    validateForm,
    amount,
    changeAmount,
    to,
    changeTo,
    errors,
    clearForm,
  } = useSendForm({
    activeOptionId: activeOption?.id,
    balancePolygon,
    balanceFora,
  });

  const {
    isFormStage,
    submitTransfer,
    changeFormStage,
    fee,
    confirmTransfer,
    isTransactionInProgress,
  } = usePrepareTransfer({
    to,
    amount,
    validateForm,
    clearForm,
    token: activeOption?.id as TOKEN,
  });

  const { decimals } = TOKEN_CONFIG[CONFIG.NETWORK_TYPE][CONFIG.NETWORK][activeOptionId as TOKEN];

  const totalAmount = useTotalAmount({
    amount, decimals, fee, activeOptionId,
  });

  return (
    <Section className={styles.root}>
      {isFormStage ? (
        <TransferForm
          currencyOptions={currencyOptions}
          onChangeAmount={changeAmount}
          amount={amount}
          totalAmount={totalAmount.toString() || '0'}
          onSubmit={submitTransfer}
          to={to}
          fee={fee.toString()}
          changeTo={changeTo}
          errors={errors}
          onSelectOption={onSelectOption}
          activeOptionId={activeOptionId}
        />
      ) : (
        <TransferConfirm
          currencyIcon={ICONS.COIN_FORA}
          amount={amount}
          onCancel={changeFormStage}
          confirmTransfer={confirmTransfer}
          token={FORA_NAME}
          fee={fee.toString()}
          feeToken={NETWORK_TOKEN_NAME[CONFIG.NETWORK]}
          network={NETWORK_NAME[CONFIG.NETWORK]}
          from={address}
          to={to}
          isTransactionInProgress={isTransactionInProgress}
        />
      )}
    </Section>
  );
};

export default memo(TransferSend);
