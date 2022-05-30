import React from 'react';
import HistoryPage from '@containers/HistoryPage';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layout/Layout';

const History = () => (
  <PrivateRoute>
    <Layout>
      <HistoryPage />
    </Layout>
  </PrivateRoute>
);

export default History;
