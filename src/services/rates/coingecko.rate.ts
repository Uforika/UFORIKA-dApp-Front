import { coinGeckoGet as get } from '@helpers/axios.helper';

/** api https://www.coingecko.com/en/api/documentation */

type PriceType = { [key: string]: { [key: string]: number } }

export const getPrice = async (ids: string, currencies: string): Promise<PriceType> => {
  const coinPrice = await get<PriceType>('/simple/price', { ids, vs_currencies: currencies });
  return coinPrice;
};
