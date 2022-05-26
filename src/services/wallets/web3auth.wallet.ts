import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import Web3 from 'web3';
import { provider as ProviderType } from 'web3-core';
import {
  ADAPTER_EVENTS,
  ADAPTER_STATUS,
  ADAPTER_STATUS_TYPE,
  MULTI_CHAIN_ADAPTERS,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from '@web3auth/base';
import { Web3AuthCore as Web3AuthCoreType } from '@web3auth/core';
import { CONFIG } from '@constants/config.constants';
import { CHAIN_CONFIG } from '@constants/network.constants';
import { LOGIN_PROVIDER } from '@constants/wallets.constants';
import { logError, logInfo } from '@helpers/log.helper';
import { UX_MODE } from '@toruslabs/openlogin';
import { ConnectType } from '../../types/wallets.types';

type Web3AuthWalletType = {
  status: ADAPTER_STATUS_TYPE | undefined,
  getAccounts: () => Promise<string[]>,
  getChainId: () => Promise<number>,
  getBalance: (address: string) => Promise<string>,
  sign: (message: string, address: string) => Promise<string>,
  connect: ConnectType,
  logout: () => Promise<void>,
  web3: Web3 | undefined,
  web3WS: Web3 | undefined,
}

const useWeb3Auth: () => Web3AuthWalletType = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
  const [web3WS, setWeb3WS] = useState<Web3 | undefined>(undefined);
  const [web3Auth, setWeb3Auth] = useState<Web3AuthCoreType | undefined>(undefined);
  const [status, setStatus] = useState<ADAPTER_STATUS_TYPE | undefined>(ADAPTER_STATUS.NOT_READY);

  const initWeb3 = (provider: SafeEventEmitterProvider | ProviderType) => {
    const web3Instance = new Web3(provider as ProviderType);
    const web3InstanceWS = new Web3();
    web3InstanceWS.setProvider(new Web3.providers.WebsocketProvider(CHAIN_CONFIG[CONFIG.NETWORK].rpcWss));
    setWeb3(web3Instance);
    setWeb3WS(web3InstanceWS);
  };

  const subscribeAuthEvents = useCallback((web3auth: Web3AuthCoreType) => {
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
      const { Web3AuthCore } = await import('@web3auth/core');
      const { OpenloginAdapter } = await import('@web3auth/openlogin-adapter');
      const { MetamaskAdapter } = await import('@web3auth/metamask-adapter');

      const web3AuthInstance = new Web3AuthCore({
        chainConfig: {
          chainNamespace: CHAIN_CONFIG[CONFIG.NETWORK].chainNamespace,
          rpcTarget: CHAIN_CONFIG[CONFIG.NETWORK].rpcTarget,
          chainId: CHAIN_CONFIG[CONFIG.NETWORK].chainId,
        },
        storageKey: 'local',
      });
      subscribeAuthEvents(web3AuthInstance);

      const metamaskAdapter = new MetamaskAdapter();
      const openLoginAdapter = new OpenloginAdapter({
        adapterSettings: {
          network: 'testnet',
          clientId:
          CONFIG.CLIENT_ID,
          uxMode: UX_MODE.REDIRECT,
        },
      });
      web3AuthInstance.configureAdapter(metamaskAdapter);
      web3AuthInstance.configureAdapter(openLoginAdapter);
      await web3AuthInstance.init();

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

  const connect: ConnectType = useCallback(async (loginProvider, loginPayload) => {
    if (!web3Auth) return;
    if (loginProvider === LOGIN_PROVIDER.METAMASK) {
      await web3Auth.connectTo(WALLET_ADAPTERS.METAMASK, { loginProvider, login_hint: loginPayload });
      return;
    }

    await web3Auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, { loginProvider, login_hint: loginPayload });
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
    web3,
    web3WS,
  }), [connect, getAccounts, getBalance, getChainId, logout, sign, status, web3, web3WS]);
};

export default useWeb3Auth;
