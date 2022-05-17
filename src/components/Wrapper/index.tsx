import React, { memo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
  title?: string,
  subtitle?: string,
  className?: string,
  children: React.ReactNode
}

const Wrapper = ({
  className, children, title, subtitle,
}: Props) => (
  <div className={cn(styles.wrapper, className)}>
    {title && <h1 className={styles.title}>{title}</h1>}
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    {children}
  </div>
);

Wrapper.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
};

export default memo(Wrapper);
