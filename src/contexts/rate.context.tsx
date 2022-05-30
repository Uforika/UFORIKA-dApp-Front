import React, {
  createContext, FC, useCallback, useMemo, useState,
} from 'react';
import {
  CURRENCY, TOKEN, TOKEN_CONFIG, TOKEN_ID,
} from '@constants/token.constants';
import { CONFIG } from '@constants/config.constants';
import { getPrice } from '@services/rates/coingecko.rate';
import { INTERVAL_UPDATE, RATE_DEFAULT_VALUE } from '@constants/rate.constants';

export type RateContextType = {
  getCurrencyPrice: (tokenName: TOKEN, currency: CURRENCY) => Promise<number>,
}

const initialContextState = {
  getCurrencyPrice: () => Promise.resolve(RATE_DEFAULT_VALUE),
};

export const RateContext = createContext<RateContextType>(initialContextState);

const RateProvider: FC = ({ children }) => {

  const [savedSavedCurrencyPrice, setSavedCurrencyPrice] = useState<{ [key: string]: { [key: string]: number } } | undefined>(undefined);

  const getCurrencyPriceFromApi = async (tokenId: TOKEN_ID, currency: CURRENCY) => {
    const priceResponse = await getPrice(tokenId, currency);
    return priceResponse[tokenId][currency];
  };

  const getCurrencyPrice = useCallback(async (tokenName: TOKEN, currency: CURRENCY): Promise<number> => {
    let currencyPrice: number | undefined;

    if (savedSavedCurrencyPrice) currencyPrice = savedSavedCurrencyPrice[tokenName]?.[currency];

    if (!currencyPrice) {
      const token = TOKEN_CONFIG[CONFIG.NETWORK_TYPE][CONFIG.NETWORK][tokenName];

      currencyPrice = await getCurrencyPriceFromApi(token.tokenId, currency);

      setSavedCurrencyPrice((currentSavedCurrencyPrice) => ({
        ...currentSavedCurrencyPrice,
        [tokenName]: {
          [currency]: currencyPrice ?? RATE_DEFAULT_VALUE,
        },
      }));

      setInterval(() => {
        (async () => {
          currencyPrice = await getCurrencyPriceFromApi(token.tokenId, currency);

          setSavedCurrencyPrice((currentSavedCurrencyPrice) => ({
            [tokenName]: {
              [currency]: currencyPrice ?? RATE_DEFAULT_VALUE,
            },
            ...currentSavedCurrencyPrice,
          }));

        })().catch(() => null);
      }, INTERVAL_UPDATE);
    }

    return currencyPrice;
  }, [savedSavedCurrencyPrice]);

  const rateProviderValue = useMemo(() => ({
    getCurrencyPrice,
  }), [getCurrencyPrice]);

  return (
    <RateContext.Provider value={rateProviderValue}>
      {children}
    </RateContext.Provider>
  );
};

export { RateProvider };
