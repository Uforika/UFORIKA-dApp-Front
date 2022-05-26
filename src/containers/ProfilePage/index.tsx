import React, { memo, useMemo } from 'react';
import PageWrapper from '@components/PageWrapper';
import { useAuth } from '@hooks/auth.hooks';
import Wallet from './Wallet';
import Collectibles from './Collectibles';

const ProfilePage = () => {
  const { userInfo } = useAuth();

  const name = useMemo(() => {
    if (!Object.keys(userInfo).length) return undefined;
    return userInfo.email || userInfo.name;
  }, [userInfo]);

  return (
    <PageWrapper title="Hello!" subtitle={name}>
      <Wallet />
      <Collectibles />
    </PageWrapper>
  );
};

export default memo(ProfilePage);
