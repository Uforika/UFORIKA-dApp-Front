import React, { FC, memo } from 'react';
import Button from '@components/Button';
import { useAuth } from '@hooks/auth.hooks';
import useWallet from '@hooks/wallet';
import { ADAPTER_STATUS } from '@web3auth/base';
import { useAuthControllerGetMe } from '@782-uforika/client-sdk/services/AuthService';
import { useConfirmModal, useSuccessModal, useFailModal } from '@hooks/modals.hooks';

type Props = {
  title: string;
};

const MainPage: FC<Props> = ({ title }) => {
  const getMe = useAuthControllerGetMe();

  const { userProfile } = useAuth();

  const {
    chainId, address, getBalance, walletStatus, walletAuth, walletLogout,
  } = useWallet();

  const [showSuccessModal] = useSuccessModal('TEST', () => null);
  const [showFailModal] = useFailModal('TEST', () => null);
  const [showConfirmModal] = useConfirmModal('TEST', () => null, () => null);

  const getData = async () => {
    const balance = await getBalance();
    console.log('chainId: ', chainId);
    console.log('address: ', address);
    console.log('balance: ', balance);
  };

  const getProfile = async () => {
    const me = await getMe();
    console.log('me: ', me);
  };

  return walletStatus !== ADAPTER_STATUS.NOT_READY && userProfile !== undefined ? (
    <div>
      <h2>{title}</h2>
      <br />
      { userProfile !== null ? (
        <>
          <Button primary onClick={walletLogout}>LOGOUT</Button>
          <Button secondary onClick={getData}>Get Info</Button>
          <Button onClick={getProfile}>Get Profile</Button>
        </>
      ) : (
        <>
          <Button primary onClick={walletAuth} size="large">LOGIN</Button>
          <br />
          <Button onClick={showFailModal} size="large">Modal Fail</Button>
          <br />
          <Button onClick={showSuccessModal} size="large">Modal Success</Button>
          <br />
          <Button onClick={showConfirmModal} size="large">Modal Confirm</Button>
        </>
      )}
    </div>
  ) : <div>Loading</div>;
};

export default memo(MainPage);
