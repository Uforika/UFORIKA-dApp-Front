import { TOKEN } from '@constants/token.constants';
import BigNumber from 'bignumber.js';

export const useCurrencyConversion = (fromToken: TOKEN, toToken: TOKEN, amount: BigNumber): BigNumber => {

  const exchangeRate = new BigNumber(30);

  if (fromToken && toToken) {
    return amount.div(exchangeRate);
  }
  return new BigNumber(0);
};
