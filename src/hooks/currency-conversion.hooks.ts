import { CURRENCY, TOKEN } from '@constants/token.constants';
import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useRate } from '@hooks/rate.hooks';
import { RATE_DEFAULT_VALUE } from '@constants/rate.constants';

export const useCurrencyConversion = (fromToken: TOKEN, currency: CURRENCY, amount: BigNumber): BigNumber => {
  const { getCurrencyPrice } = useRate();
  const [exchangeRate, setExchangeRate] = useState(new BigNumber(RATE_DEFAULT_VALUE));

  useEffect(() => {
    const getExchangeRate = async () => {
      const exchangeRateResponse = await getCurrencyPrice(fromToken, currency);
      setExchangeRate(new BigNumber(exchangeRateResponse));
    };
    getExchangeRate().catch(() => null);
  }, [currency, fromToken, getCurrencyPrice]);

  const convertedValue = amount.div(new BigNumber(exchangeRate));

  return convertedValue;
};
