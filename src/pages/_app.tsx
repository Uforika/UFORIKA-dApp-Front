import React from 'react';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';
import ReactModal from 'react-modal';
import { useSocket } from '@hooks/socket.hooks';
import '@assets/scss/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';
import { AppProps } from 'next/app';
import { ModalProvider } from '@contexts/modals.context';

ReactModal.setAppElement('#__next');

const MyApp = ({ Component, pageProps }: AppProps) => {
  const socket = useSocket(true);
  if (socket) {
    //  Here you can access to socket instance
  }

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
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
    </SWRConfig>
  );
};

export default MyApp;
