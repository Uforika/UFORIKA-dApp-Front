import BigNumber from 'bignumber.js';
import { DEFAULT_TOKEN_DECIMAL } from '@constants/token.constants';

export const divideTokenValueByDecimal = (value: number | string, tokenDecimal?: string) => {
  const decimal = new BigNumber(10 ** Number(tokenDecimal || DEFAULT_TOKEN_DECIMAL));
  return new BigNumber(value).div(decimal).toString();
};
