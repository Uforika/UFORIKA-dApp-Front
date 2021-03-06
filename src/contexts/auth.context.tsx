import React, {
  createContext, FC, useEffect, useMemo, useState,
} from 'react';
import { ADAPTER_STATUS, UserInfo } from '@web3auth/base';
import { useWallet } from '@hooks/wallet.hooks';
import { logError } from '@helpers/log.helper';
import {
  useAuthControllerGetMeSWR,
  useAuthControllerGetSignMessage,
  useAuthControllerSignIn, useAuthControllerSignOut,
} from '@782-uforika/client-sdk/services/AuthService';
import { showToast } from '@components/Toast';
import { TOAST_MASSAGE_ERRORS } from '@constants/messages.constants';
import { TOAST_ERROR } from '@constants/toast.constants';
import { LOCAL_STORAGE_TRANSACTION_HISTORY_KEY } from '@constants/transaction.constants';
import { AUTH_ERROR } from '@constants/auth.constants';
import { ApiError } from '@782-uforika/client-sdk/core/ApiError';
import { AuthMeType } from '../types/auth.types';
import { BodyErrorType } from '../types/api.types';

/**
 * AuthMeType - AUTHORIZED
 * null - UNAUTHORIZED
 * undefined - LOADING
 */

export type AuthContextType = {
  userProfile: AuthMeType | undefined | null,
  isAuthorized: boolean,
  isLoading: boolean,
  userInfo: Partial<UserInfo>,
}

const initialContextState = {
  userProfile: undefined,
  isAuthorized: false,
  isLoading: true,
  userInfo: {},
};

export const AuthContext = createContext<AuthContextType>(initialContextState);

const AuthProvider: FC = ({ children }) => {
  const {
    address, sign, walletStatus, walletLogout, userInfo,
  } = useWallet();

  const [userProfile, setUserProfile] = useState<AuthMeType | undefined | null>(undefined);

  const signMessage = useAuthControllerGetSignMessage();
  const signIn = useAuthControllerSignIn();
  const signOut = useAuthControllerSignOut();
  const [meProfile, , mutateProfile] = useAuthControllerGetMeSWR();

  useEffect(() => {
    if ((!address && walletStatus === ADAPTER_STATUS.READY && userProfile !== null)) {
      setUserProfile(undefined);
      signOut({}).then(async () => {
        localStorage.removeItem(LOCAL_STORAGE_TRANSACTION_HISTORY_KEY);
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

      } catch (errorResponse) {

        if (errorResponse instanceof ApiError) {
          errorResponse.body.errors.forEach((error: BodyErrorType) => {
            if (error.message === AUTH_ERROR.USER_BLOCKED) {
              showToast(TOAST_MASSAGE_ERRORS.AUTH_ERROR_BLOCKED_USER, TOAST_ERROR);
            }
          });
        } else {
          showToast(TOAST_MASSAGE_ERRORS.AUTH_ERROR, TOAST_ERROR);
        }

        logError(errorResponse);
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
    userInfo,
    isAuthorized: !!userProfile,
    isLoading: userProfile === undefined || walletStatus === ADAPTER_STATUS.NOT_READY
        || walletStatus === undefined || walletStatus === ADAPTER_STATUS.CONNECTING,
  }), [userInfo, userProfile, walletStatus]);

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
