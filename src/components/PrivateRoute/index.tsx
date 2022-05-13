import React, {
  FC, memo, useEffect,
} from 'react';
import { useAuth } from '@hooks/auth.hooks';
import { useRouter } from 'next/router';
import { PATH_INDEX } from '@constants/routes.constants';
import { Loader } from 'semantic-ui-react';

type Props = {
  children: React.ReactNode
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { isAuthorized, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthorized && !isLoading) {
      router.push(PATH_INDEX).catch(() => null);
    }

  }, [isAuthorized, isLoading, router]);

  return (
    <> {isLoading || !isAuthorized ? <Loader size="large" active /> : children}</>
  );
};

export default memo(PrivateRoute);
