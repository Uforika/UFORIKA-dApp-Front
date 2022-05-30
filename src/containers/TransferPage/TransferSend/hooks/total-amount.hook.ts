import BigNumber from 'bignumber.js';
import { CURRENCY, TOKEN } from '@constants/token.constants';
import { useCurrencyConversion } from '@hooks/currency-conversion.hooks';
import { balanceToBN } from '@helpers/balance.helper';

type Props = {
  amount: string | undefined,
  decimals: number,
  fee: BigNumber
  activeOptionId: TOKEN | null
}

export const useTotalAmount = ({
  amount, decimals, fee, activeOptionId,
}: Props) => {
  const feeUsd = useCurrencyConversion(TOKEN.POLYGON, CURRENCY.USD, fee);
  const balanceUsd = useCurrencyConversion(
    activeOptionId as TOKEN,
    CURRENCY.USD,
    balanceToBN(amount || '0', decimals),
  );

  return balanceUsd.toNumber() ? balanceUsd.div(decimals).plus(feeUsd) : new BigNumber(0);
};
