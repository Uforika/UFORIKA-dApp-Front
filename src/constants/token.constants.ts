import { NETWORK, NETWORK_TYPE } from '@constants/network.constants';

export enum CURRENCY {
  ETHEREUM='eth',
  USD='usd',
  EURO='eur',
  BITCOIN='btc',
}

export enum TOKEN {
  POLYGON='POLYGON',
  FORA='FORA',
}

export const NETWORK_TOKEN_NAME = {
  [NETWORK.POLYGON]: 'MATIC',
};

export const NETWORK_NAME = {
  [NETWORK.POLYGON]: 'Polygon',
};

export const DEFAULT_TOKEN_DECIMAL = 18;

export enum TOKEN_ID {
  POLYGON='matic-network',
  FORA='matic-network',
}

export const TOKEN_CONFIG = {
  [NETWORK_TYPE.MAINNET]: {
    [NETWORK.POLYGON]: {
      [TOKEN.POLYGON]: {
        address: '0x0000000000000000000000000000000000001010',
        tokenId: TOKEN_ID.POLYGON,
        decimals: 10 ** 18,
      },
      [TOKEN.FORA]: {
        address: '0x0000000000000000000000000000000000001010',
        tokenId: TOKEN_ID.FORA,
        decimals: 10 ** 18,
      },
    },
  },
  [NETWORK_TYPE.TESTNET]: {
    [NETWORK.POLYGON]: {
      [TOKEN.POLYGON]: {
        address: '0x0000000000000000000000000000000000001010',
        tokenId: TOKEN_ID.POLYGON,
        decimals: 10 ** 18,
      },
      [TOKEN.FORA]: {
        address: '0xfe4f5145f6e09952a5ba9e956ed0c25e3fa4c7f1',
        tokenId: TOKEN_ID.FORA,
        decimals: 10 ** 18,
      },
    },
  },
};
