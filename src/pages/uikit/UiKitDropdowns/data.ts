import { ICONS } from '@components/Icon/types';

export const options = [
  { text: 'One', value: 'one' },
  { text: 'Two', value: 'two' },
  { text: 'Three', value: 'three' },
];

export const currencyOptions = [
  {
    text: 'USDT',
    value: '0.00',
    image: ICONS.DROPDOWN_CURRENCY_USDT,
    id: 'usdt',
  },
  {
    text: 'RFUEL',
    value: '10,000.001',
    image: ICONS.DROPDOWN_CURRENCY_RFUEL,
    id: 'rfuel',
  },
  {
    text: 'BTC',
    value: '0.08',
    image: ICONS.DROPDOWN_CURRENCY_BTC,
    id: 'btc',
  },
];
