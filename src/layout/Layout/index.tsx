import React, {
  FC, memo, useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { Sidebar as UISidebar } from 'semantic-ui-react';
import cn from 'classnames';
import { PATH_INDEX } from '@constants/routes.constants';
import { useAuth } from '@hooks/auth.hooks';
import Footer from '../Footer';
import Sidebar from '../Sidebar';
import Header from '../Header';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const isHomePage = useMemo(() => router.pathname === PATH_INDEX, [router.pathname]);

  const { isAuthorized } = useAuth();

  return (
    <UISidebar.Pushable className={cn(styles.wrap, { [styles.isHomePage]: isHomePage })}>
      <div className={cn(styles.backgroundImage, { [styles.offsetBg]: isHomePage })} />
      {!isHomePage && isAuthorized && (
        <div className={styles.headerWrapper}>
          <Header />
        </div>
      ) }
      {!isHomePage && isAuthorized && (
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
      )}

      <div className={styles.contentWrapper}>
        <UISidebar.Pusher className={styles.main}>
          {children}
        </UISidebar.Pusher>
      </div>

      <div className={styles.footerWrapper}>
        <Footer />
      </div>
    </UISidebar.Pushable>
  );
};

export default memo(Layout);
