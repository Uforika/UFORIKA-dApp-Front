import React, {
  FC, memo, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { Sidebar } from 'semantic-ui-react';
import cn from 'classnames';
import { PATH_INDEX } from '@constants/routes.constants';
import { useAuth } from '@hooks/auth.hooks';
import Footer from '../Footer';
import LeftSidebar from '../LeftSidebar';
import TopSidebar from '../TopSidebar';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isHomePage = useMemo(() => router.pathname === PATH_INDEX, [router.pathname]);

  const { isAuthorized } = useAuth();

  return (
    <Sidebar.Pushable className={styles.pushable}>
      <div className={cn(styles.backgroundImage, { [styles.offsetBg]: isHomePage })} />
      {!isHomePage && isAuthorized && <TopSidebar />}
      {!isHomePage && isAuthorized && (<LeftSidebar />)}

      <Sidebar.Pusher className={cn(styles.main, { [styles.mainPadding]: !isHomePage })}>
        {children}
      </Sidebar.Pusher>

      <Footer />
    </Sidebar.Pushable>
  );
};

export default memo(Layout);
