import { CHAIN_NAMESPACES } from '@web3auth/base';
import { hexValue } from '@ethersproject/bytes';

export enum NETWORK {
  POLYGON='POLYGON',
}

export enum NETWORK_TYPE {
  MAINNET='mainnet',
  TESTNET='testnet',
}

export const CHAIN_CONFIG = {
  [NETWORK_TYPE.MAINNET]: {
    [NETWORK.POLYGON]: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: hexValue(137),
      rpcTarget: 'https://rpc-mainnet.matic.network',
      rpcWss: 'wss://rpc-mainnet.matic.network',
    },
  },
  [NETWORK_TYPE.TESTNET]: {
    [NETWORK.POLYGON]: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: hexValue(80001),
      rpcTarget: 'https://matic-mumbai.chainstacklabs.com',
      rpcWss: 'wss://ws-matic-mumbai.chainstacklabs.com',
    },
  },
};

export const TRX_LINK_CONSTRUCTOR = {
  [NETWORK_TYPE.MAINNET]: { [NETWORK.POLYGON]: (address: string) => `https://polygonscan.com/tx/${address}` },
  [NETWORK_TYPE.TESTNET]: { [NETWORK.POLYGON]: (address: string) => `https://mumbai.polygonscan.com/tx/${address}` },
};
