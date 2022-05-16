import React, {
  createContext, FC, useEffect, useMemo, useState,
} from 'react';
import { ADAPTER_STATUS } from '@web3auth/base';
import useWallet from '@hooks/wallet';
import { logError } from '@helpers/log.helper';
import {
  useAuthControllerGetMeSWR,
  useAuthControllerGetSignMessage,
  useAuthControllerSignIn, useAuthControllerSignOut,
} from '@782-uforika/client-sdk/services/AuthService';
import { showToast } from '@components/Toast';
import { TOAST_MASSAGE_ERRORS } from '@constants/messages.constants';
import { TOAST_ERROR } from '@constants/toast.constants';
import { AuthMeType } from '../types/auth.types';

/**
 * AuthMeType - AUTHORIZED
 * null - UNAUTHORIZED
 * undefined - LOADING
 */

export type AuthContextType = {
  userProfile: AuthMeType | undefined | null,
  isAuthorized: boolean,
  isLoading: boolean,
}

const initialContextState = {
  userProfile: undefined,
  isAuthorized: false,
  isLoading: true,
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

const AuthProvider: FC = ({ children }) => {
  const {
    address, sign, walletStatus, walletLogout,
  } = useWallet();

  const [userProfile, setUserProfile] = useState<AuthMeType | undefined | null>(undefined);

  const signMessage = useAuthControllerGetSignMessage();
  const signIn = useAuthControllerSignIn();
  const signOut = useAuthControllerSignOut();
  const [meProfile, , mutateProfile] = useAuthControllerGetMeSWR();

  useEffect(() => {
    if ((!address && walletStatus === ADAPTER_STATUS.READY && userProfile !== null)
        || walletStatus === ADAPTER_STATUS.DISCONNECTED) {
      signOut({}).then(async () => {
        await mutateProfile();
      }).catch(() => null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, walletStatus]);

  useEffect(() => {
    if (!address || walletStatus !== ADAPTER_STATUS.CONNECTED || (userProfile || userProfile === undefined)) return;
    const auth = async () => {
      try {
        setUserProfile(undefined);

        const messageResponse = await signMessage();

        const signature = await sign(messageResponse.message);

        await signIn({ address, signature });

        await mutateProfile();

      } catch (error) {
        showToast(TOAST_MASSAGE_ERRORS.AUTH_ERROR, TOAST_ERROR);
        logError(error);
        await walletLogout();
      }
    };
    auth().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, sign, walletLogout, userProfile, walletStatus]);

  useEffect(() => {
    if (walletStatus === ADAPTER_STATUS.NOT_READY) return;
    if (meProfile === null) {
      setUserProfile(null);
      return;
    }
    if (walletStatus === ADAPTER_STATUS.CONNECTED && meProfile) setUserProfile(meProfile);

  }, [meProfile, walletStatus]);

  const authProviderValue = useMemo(() => ({
    userProfile,
    isAuthorized: !!userProfile || walletStatus === ADAPTER_STATUS.NOT_READY,
    isLoading: userProfile === undefined,
  }), [userProfile, walletStatus]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
