import React, { memo } from 'react';
import Wrapper from '@components/Wrapper';
import Wallet from './Wallet';
import Collectibles from './Collectibles';

const ProfilePage = () => (
  <Wrapper title="Hello!" subtitle="david@email.com">
    <Wallet />
    <Collectibles />
  </Wrapper>
);

export default memo(ProfilePage);
