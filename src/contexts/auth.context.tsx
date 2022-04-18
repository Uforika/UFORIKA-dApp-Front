import React, {
  createContext, FC, useEffect, useMemo, useState,
} from 'react';
import { ADAPTER_STATUS } from '@web3auth/base';
import {
  apiAuthLogin, apiAuthLogout, getAuthMe, getAuthMessage,
} from '@services/api/auth.api';
import { AUTH_STATUS } from '@constants/auth.constants';
import useWallet from '@hooks/wallet';
import { logError } from '@helpers/log.helper';
import { AuthMeType } from '../types/auth.types';

export type AuthContextType = {
  authStatus: AUTH_STATUS,
  userProfile: AuthMeType | undefined,
}

const initialContextState = {
  authStatus: AUTH_STATUS.LOADING,
  userProfile: undefined,
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

const AuthProvider: FC = ({ children }) => {
  const {
    address, sign, walletStatus, walletLogout,
  } = useWallet();

  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.LOADING);
  const [userProfile, setUserProfile] = useState<AuthMeType|undefined>(undefined);

  useEffect(() => {
    if ((!address && walletStatus === ADAPTER_STATUS.READY) || walletStatus === ADAPTER_STATUS.DISCONNECTED) {
      apiAuthLogout();
      setAuthStatus(AUTH_STATUS.UNAUTHORIZED);
    }

  }, [address, walletStatus]);

  useEffect(() => {
    if (!address || walletStatus !== ADAPTER_STATUS.CONNECTED) return;
    const auth = async () => {
      try {
        setAuthStatus(AUTH_STATUS.LOADING);

        const originalMessage = await getAuthMessage();
        const signature = await sign(originalMessage.message);
        await apiAuthLogin(address, signature);

        const profile = await getAuthMe();

        setUserProfile(profile);
        setAuthStatus(AUTH_STATUS.AUTHORIZED);
      } catch (error) {
        logError(error);
        await walletLogout();
      }
    };
    auth().catch(() => null);
  }, [address, sign, walletLogout, walletStatus]);

  const authProviderValue = useMemo(() => ({
    authStatus, userProfile,
  }), [authStatus, userProfile]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
