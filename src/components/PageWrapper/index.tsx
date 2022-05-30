import React, { memo } from 'react';
import cn from 'classnames';
import Header from '@components/Header';
import styles from './styles.module.scss';

type Props = {
  title?: string,
  subtitle?: string,
  className?: string,
  children: React.ReactNode
}

const PageWrapper = ({
  className, children, title, subtitle,
}: Props) => (
  <div className={cn(styles.wrapper, className)}>
    {title && <Header as="h1">{title}</Header>}
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    {children}
  </div>
);

PageWrapper.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
};

export default memo(PageWrapper);
