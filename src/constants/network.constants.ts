import { CHAIN_NAMESPACES } from '@web3auth/base';
import { hexValue } from '@ethersproject/bytes';

export enum NETWORK {
  MAINNET_POLYGON='MAINNET_POLYGON',
  TESTNET_POLYGON='TESTNET_POLYGON'
}

export const CHAIN_CONFIG = {
  [NETWORK.MAINNET_POLYGON]: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: hexValue(137),
  },
  [NETWORK.TESTNET_POLYGON]: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: hexValue(80001),
    rpcTarget: 'https://matic-mumbai.chainstacklabs.com/',
  },
};
