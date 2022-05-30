import React from 'react';
import { NextPage } from 'next';
import MainPage from '@containers/MainPage';
import NoAuthorizationRoute from '@components/NoAuthorizationRoute';
import Layout from '@layout/Layout';

const PageIndex: NextPage = () => (
  <NoAuthorizationRoute>
    <Layout>
      <MainPage />
    </Layout>
  </NoAuthorizationRoute>
);

export default PageIndex;
