/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { memo } from 'react';
import cn from 'classnames';
import 'focus-visible/dist/focus-visible.js';
import Link from '@components/Link';
import styles from './logo.module.scss';

type Props = {
  className?: string,
  imageUrl?: string,
  href: string,
}

const Logo = ({ className, imageUrl, href }: Props) => (
  <Link href={href || '/'}>
    <a className={cn(styles.wrapper, className)} tabIndex={0}>
      <img className={cn(styles.logo, 'px-logo')} src={imageUrl} alt="logo" />
    </a>
  </Link>
);

Logo.defaultProps = {
  className: '',
  imageUrl: '',
};

export default memo(Logo);
