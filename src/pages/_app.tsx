import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useSocket } from '@hooks/socket.hooks';
import '@assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ModalProvider } from '@contexts/modals.context';
import { AuthProvider } from '@contexts/auth.context';
import { WalletProvider } from '@contexts/wallet.context';
import { SDKConfig } from '@782-uforika/client-sdk';
import { TSDKConfig } from '@782-uforika/client-sdk/core/ConfigContext';
import { CONFIG } from '@constants/config.constants';
import { SDK_PATH_TO_JWT, SDK_REFRESH_TOKEN_REQUEST, SDK_SIGN_IN_PATHS } from '@constants/sdk.constants';
import { RateProvider } from '@contexts/rate.context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const socket = useSocket(true);
  if (socket) {
    //  Here you can access to socket instance
  }

  return (
    <>
      <Head>
        <title>Uforika Metaverse</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#000000" />
      </Head>
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
            <RateProvider>
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
            </RateProvider>
          </AuthProvider>
        </WalletProvider>
      </SDKConfig>
    </>
  );
};

export default MyApp;
