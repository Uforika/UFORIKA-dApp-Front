import React, { FC, memo } from 'react';
import Button from '@components/Button';
import { useAuth } from '@hooks/auth.hooks';
import useWallet from '@hooks/wallet';
import { ADAPTER_STATUS } from '@web3auth/base';
import { useAuthControllerGetMe } from '@782-uforika/client-sdk/services/AuthService';

type Props = {
  title: string;
};

const MainPage: FC<Props> = ({ title }) => {
  const getMe = useAuthControllerGetMe();

  const { userProfile } = useAuth();

  const {
    chainId, address, getBalance, walletStatus, walletAuth, walletLogout,
  } = useWallet();

  const getData = async () => {

    const balance = await getBalance();

    console.log('balance', balance);
    console.log('address', address);
    console.log('chainId', chainId);
  };

  const getProfile = async () => {
    const me = await getMe();
    console.log('userProfile', me);
  };

  return walletStatus !== ADAPTER_STATUS.NOT_READY && userProfile !== undefined ? (
    <div>
      <h2>{title}</h2>
      <br />
      { userProfile !== null ? (
        <>
          <Button onClick={walletLogout}>LOGOUT</Button>
          <Button onClick={getData}>Get Info</Button>
          <Button onClick={getProfile}>Get Profile</Button>
        </>
      ) : <Button onClick={walletAuth}>LOGIN</Button>}
    </div>
  ) : <div>Loading</div>;
};

export default memo(MainPage);
