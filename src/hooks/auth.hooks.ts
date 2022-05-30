import { useContext } from 'react';
import { AuthContext } from '@contexts/auth.context';

export const useAuth = () => {
  const {
    userProfile, isAuthorized, isLoading, userInfo,
  } = useContext(AuthContext);
  return {
    userProfile, isAuthorized, isLoading, userInfo,
  };
};
