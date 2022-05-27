import { ICONS } from '@components/Icon/constants';
import { FORA_NAME, MATIC_NAME } from '@constants/global.constants';
import { TOKEN } from '@constants/token.constants';

type CurrencyOptionsPops = {
  balanceFora: string,
  balancePolygon: string,
}

export const getCurrencyOptions = ({ balanceFora, balancePolygon }: CurrencyOptionsPops) => [
  {
    text: FORA_NAME,
    value: balanceFora.toString(),
    image: ICONS.COIN_FORA,
    id: TOKEN.FORA,
  },
  {
    text: MATIC_NAME,
    value: balancePolygon.toString(),
    image: ICONS.COIN_MATIC,
    id: TOKEN.POLYGON,
  },
];
