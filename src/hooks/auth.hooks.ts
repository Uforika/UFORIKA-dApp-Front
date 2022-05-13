import { useContext } from 'react';
import { AuthContext } from '@contexts/auth.context';

export const useAuth = () => {
  const {
    userProfile, isAuthorized, isLoading,
  } = useContext(AuthContext);
  return {
    userProfile, isAuthorized, isLoading,
  };
};
