import { useContext } from 'react';
import { AuthContext } from '@contexts/auth.context';

export const useAuth = () => {
  const {
    userProfile,
  } = useContext(AuthContext);
  return {
    userProfile,
  };
};
