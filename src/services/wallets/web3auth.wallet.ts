import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Web3 from 'web3';
import { provider as ProviderType } from 'web3-core';
import {
  ADAPTER_EVENTS, ADAPTER_STATUS, ADAPTER_STATUS_TYPE,
  MULTI_CHAIN_ADAPTERS,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import { Web3Auth as Web3AuthType } from '@web3auth/web3auth';
import { CONFIG } from '@constants/config.constants';
import { CHAIN_CONFIG } from '@constants/network.constants';
import { logError, logInfo } from '@helpers/log.helper';

type Web3AuthWalletType = {
  status: ADAPTER_STATUS_TYPE | undefined
  getAccounts: () => Promise<string[]>
  getChainId: () => Promise<number>
  getBalance: (address: string) => Promise<string>
  sign: (message: string, address: string) => Promise<string>
  connect: () => Promise<void>
  logout: () => Promise<void>
}

const useWeb3Auth: () => Web3AuthWalletType = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [web3Auth, setWeb3Auth] = useState<Web3AuthType | undefined>(undefined);
  const [status, setStatus] = useState<ADAPTER_STATUS_TYPE | undefined>(ADAPTER_STATUS.NOT_READY);

  const initWeb3 = (provider: SafeEventEmitterProvider | ProviderType) => {
    const web3Instance = new Web3(provider as ProviderType);
    setWeb3(web3Instance);
  };

  const subscribeAuthEvents = useCallback((web3auth: Web3AuthType) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, () => {
      logInfo('connected to wallet');
      initWeb3(web3auth.provider);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      logInfo('connecting');
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      setStatus(ADAPTER_STATUS.DISCONNECTED);
      logInfo('disconnected');
      setWeb3(undefined);
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      logError(error);
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      logError(error);
    });

  }, []);

  const initWeb3Auth = useCallback(async () => {
    try {
      /** for fix problem https://github.com/Web3Auth/Web3Auth/issues/66 */
      const { Web3Auth } = await import('@web3auth/web3auth');

      const web3AuthInstance = new Web3Auth({
        chainConfig: CHAIN_CONFIG[CONFIG.NETWORK],
        clientId: CONFIG.CLIENT_ID,
        storageKey: 'local',
      });

      subscribeAuthEvents(web3AuthInstance);

      await web3AuthInstance.initModal({
        modalConfig: {
          [WALLET_ADAPTERS.METAMASK]: {
            label: 'metamask',
            showOnModal: true,
          },
          [WALLET_ADAPTERS.TORUS_EVM]: {
            showOnModal: false,
            showOnDesktop: false,
            showOnMobile: false,
            label: '',
          },
          [WALLET_ADAPTERS.WALLET_CONNECT_V1]: {
            showOnModal: false,
            showOnDesktop: false,
            showOnMobile: false,
            label: '',
          },
        },
      });
      setWeb3Auth(web3AuthInstance);
    } catch (error) {
      logError(error);
    }
  }, [subscribeAuthEvents]);

  useEffect(() => {
    if (!web3Auth) {
      initWeb3Auth().catch(() => null);
    }
  }, [initWeb3Auth, web3Auth]);

  useEffect(() => {
    setStatus(web3Auth?.status);
  }, [web3Auth?.status]);

  const getAccounts = useCallback(() => {
    if (!web3) throw new Error('Not loaded web3');
    return web3.eth.getAccounts();
  }, [web3]);

  const getChainId = useCallback(() => {
    if (!web3) throw new Error('Not loaded web3');
    return web3.eth.getChainId();
  }, [web3]);

  const getBalance = useCallback((address: string): Promise<string> => {
    if (!web3 || !web3.currentProvider || !web3Auth) throw new Error('Not loaded web3');
    return web3.eth.getBalance(address);
  }, [web3, web3Auth]);

  const sign = useCallback(async (message: string, address: string): Promise<string> => {
    if (!web3 || !web3.currentProvider || !web3Auth || !address) throw new Error('Not loaded web3');

    const adapterName = web3Auth.connectedAdapterName;
    const isOpenLogin = adapterName === MULTI_CHAIN_ADAPTERS.OPENLOGIN;

    const provider = web3.currentProvider;

    const convertedMessage = isOpenLogin ? JSON.parse(message) : message;

    const params = [address, convertedMessage];
    const method = 'eth_signTypedData_v4';

    let requestResult;
    if (isOpenLogin) {
      requestResult = await (provider as SafeEventEmitterProvider).sendAsync({
        method,
        params,
      });
    }

    if (typeof provider === 'object' && 'request' in provider && provider.request) {
      requestResult = await provider.request({
        method,
        params,
      });
    }

    if (typeof requestResult !== 'string') throw new Error('Invalid request result');

    return requestResult;

  }, [web3, web3Auth]);

  const connect = useCallback(async (): Promise<void> => {
    if (!web3Auth) return;
    await web3Auth.connect();
  }, [web3Auth]);

  const logout = useCallback(async (): Promise<void> => {
    if (!web3Auth) return;
    await web3Auth.logout();
  }, [web3Auth]);

  return useMemo(() => ({
    status,
    getAccounts,
    getChainId,
    getBalance,
    sign,
    connect,
    logout,
  }), [connect, getAccounts, getBalance, getChainId, logout, sign, status]);
};

export default useWeb3Auth;
