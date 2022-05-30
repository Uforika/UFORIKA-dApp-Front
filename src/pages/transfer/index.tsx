import React from 'react';
import TransferPage from '@containers/TransferPage';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layout/Layout';

const Transfer = () => (
  <PrivateRoute>
    <Layout>
      <TransferPage />
    </Layout>
  </PrivateRoute>
);

export default Transfer;
