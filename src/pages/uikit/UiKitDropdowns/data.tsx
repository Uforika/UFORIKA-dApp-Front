import React from 'react';
import { ReactComponent as IconUsdt } from '@assets/images/currency/usdt24.svg';
import { ReactComponent as IconRfuel } from '@assets/images/currency/rfuel24.svg';
import { ReactComponent as IconBtc } from '@assets/images/currency/btc24.svg';
import { ReactComponent as IconUsdtSmall } from '@assets/images/currency/usdt20.svg';
import { ReactComponent as IconRfuelSmall } from '@assets/images/currency/rfuel20.svg';
import { ReactComponent as IconBtcSmall } from '@assets/images/currency/btc20.svg';

export const options = [
  { text: 'One', value: 'one' },
  { text: 'Two', value: 'two' },
  { text: 'Three', value: 'three' },
];

export const currencyOptions = [
  {
    text: 'USDT',
    value: '0.00',
    image: <IconUsdt />,
    imageSmall: <IconUsdtSmall />,
    id: 'usdt',
  },
  {
    text: 'RFUEL',
    value: '10,000.001',
    image: <IconRfuel />,
    imageSmall: <IconRfuelSmall />,
    id: 'rfuel',
  },
  {
    text: 'BTC',
    value: '0.08',
    image: <IconBtc />,
    imageSmall: <IconBtcSmall />,
    id: 'btc',
  },
];
