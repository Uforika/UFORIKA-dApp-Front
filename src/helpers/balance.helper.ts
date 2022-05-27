import { DEFAULT_TOKEN_DECIMAL } from '@constants/token.constants';
import BigNumber from 'bignumber.js';

export const calculateFee = (
  gasPrice: string | number | BigNumber,
  gasUsed: string | number | BigNumber,
  tokenDecimal?: string | number,
) => new BigNumber(gasUsed)
  .multipliedBy(gasPrice)
  .div(10 ** Number(tokenDecimal || DEFAULT_TOKEN_DECIMAL));

export const balanceToBN = (balance: string, tokenDecimal: number) => new BigNumber(balance)
  .multipliedBy(Number(tokenDecimal));
