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
    rpcTarget: 'https://rpc-mainnet.matic.network',
    rpcWss: 'wss://rpc-mainnet.matic.network',
  },
  [NETWORK.TESTNET_POLYGON]: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: hexValue(80001),
    rpcTarget: 'https://matic-mumbai.chainstacklabs.com',
    rpcWss: 'wss://ws-matic-mumbai.chainstacklabs.com',
  },
};

export const TRX_LINK_CONSTRUCTOR = {
  [NETWORK.MAINNET_POLYGON]: (address: string) => `https://polygonscan.com/tx/${address}`,
  [NETWORK.TESTNET_POLYGON]: (address: string) => `https://mumbai.polygonscan.com/tx/${address}`,

};
