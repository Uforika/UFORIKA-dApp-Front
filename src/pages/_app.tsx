import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useSocket } from '@hooks/socket.hooks';
import '@assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import { AppProps } from 'next/app';
import { ModalProvider } from '@contexts/modals.context';
import { AuthProvider } from '@contexts/auth.context';
import { WalletProvider } from '@contexts/wallet.context';
import { SDKConfig } from '@782-uforika/client-sdk';
import { TSDKConfig } from '@782-uforika/client-sdk/core/ConfigContext';
import { CONFIG } from '@constants/config.constants';
import { SDK_PATH_TO_JWT, SDK_REFRESH_TOKEN_REQUEST, SDK_SIGN_IN_PATHS } from '@constants/sdk.constants';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const socket = useSocket(true);
  if (socket) {
    //  Here you can access to socket instance
  }

  return (
    <SDKConfig
      value={{
        baseApiUrl: CONFIG.API_URL,
        refreshToken: {
          signInPaths: SDK_SIGN_IN_PATHS,
          pathToJWT: SDK_PATH_TO_JWT,
          refreshTokenRequest: SDK_REFRESH_TOKEN_REQUEST,
        },
      } as TSDKConfig}
      swrConfig={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <WalletProvider>
        <AuthProvider>
          <ModalProvider>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </ModalProvider>
        </AuthProvider>
      </WalletProvider>
    </SDKConfig>
  );
};

export default MyApp;
