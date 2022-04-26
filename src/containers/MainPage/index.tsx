import React, { FC, memo } from 'react';
import Button from '@components/Button';
import { useAuth } from '@hooks/auth.hooks';
import { AUTH_STATUS } from '@constants/auth.constants';
import useWallet from '@hooks/wallet';
import { ADAPTER_STATUS } from '@web3auth/base';
import { getAuthMe } from '@services/api/auth.api';

type Props = {
  title: string;
};

const MainPage: FC<Props> = ({ title }) => {
  const { authStatus } = useAuth();

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
    const userProfile = await getAuthMe();
    console.log('userProfile', userProfile);
  };

  return walletStatus !== ADAPTER_STATUS.NOT_READY && authStatus !== AUTH_STATUS.LOADING ? (
    <div>
      <h2>{title}</h2>
      <br />
      { authStatus === AUTH_STATUS.AUTHORIZED ? (
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
