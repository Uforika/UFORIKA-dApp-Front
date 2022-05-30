import React from 'react';
import ProfilePage from '@containers/ProfilePage';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layout/Layout';

const Profile = () => (
  <PrivateRoute>
    <Layout>
      <ProfilePage />
    </Layout>
  </PrivateRoute>
);

export default Profile;
