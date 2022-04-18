import { useContext } from 'react';
import { AuthContext } from '@contexts/auth.context';

export const useAuth = () => {
  const {
    authStatus, userProfile,
  } = useContext(AuthContext);
  return {
    authStatus, userProfile,
  };
};
