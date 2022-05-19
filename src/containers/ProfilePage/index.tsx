import React, { memo } from 'react';
import PageWrapper from '@components/PageWrapper';
import Wallet from './Wallet';
import Collectibles from './Collectibles';

const ProfilePage = () => (
  <PageWrapper title="Hello!" subtitle="david@email.com">
    <Wallet />
    <Collectibles />
  </PageWrapper>
);

export default memo(ProfilePage);
