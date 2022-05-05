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
import { AuthMeType } from '../types/auth.types';

/**
 * AuthMeType - AUTHORIZED
 * null - UNAUTHORIZED
 * undefined - LOADING
 */

export type AuthContextType = {
  userProfile: AuthMeType | undefined | null,
}

const initialContextState = {
  userProfile: undefined,
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
        logError(error);
        await walletLogout();
      }
    };
    auth().catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, sign, walletLogout, userProfile, walletStatus]);

  useEffect(() => {
    if (meProfile === null) {
      setUserProfile(null);
      return;
    }
    setUserProfile(meProfile);
  }, [meProfile]);

  const authProviderValue = useMemo(() => ({
    userProfile,
  }), [userProfile]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
