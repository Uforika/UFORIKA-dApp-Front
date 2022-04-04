/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode, memo } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import 'focus-visible/dist/focus-visible.js';

import styles from './button.module.scss';

type Props = {
  className?: string,
  href?: string,
  disabled?: boolean,
  loading?: boolean,
  children?: ReactNode,
  onClick?: () => void,
  defaultStyle?: 'blueDark' | 'blue' | 'gray' | 'red' | 'transparent' | 'withoutBorder' | 'icon',
  size?: 'sizeL' | 'sizeM' | 'sizeS',
}

const Button = ({
  className, defaultStyle, onClick, children, disabled, loading, href, size, ...props
}: Props) => {
  if (href) {
    return (
      <Link href={href}>
        <a
          className={cn(styles.button, {
            [styles[defaultStyle || '']]: defaultStyle,
            [styles[size || '']]: size,
            [styles.loading]: loading,
          }, className)}
          onClick={onClick}
          {...props}
        >
          <div className={cn(styles.content, { [styles[defaultStyle || '']]: defaultStyle })}>
            {loading && <div className={styles.loader} />}
            <span className={cn({ [styles.loading]: loading })}> {children}</span>
          </div>
        </a>
      </Link>
    );
  }
  return (
    <button
      className={cn(styles.button, {
        [styles[defaultStyle || '']]: defaultStyle,
        [styles[size || '']]: size,
        [styles.loading]: loading,
      }, className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <div className={cn(styles.content, { [styles[defaultStyle || '']]: defaultStyle })}>
        {loading && <div className={styles.loader} />}
        <span className={cn({ [styles.loading]: loading })}>{children}</span>
      </div>
    </button>
  );
};

Button.defaultProps = {
  className: '',
  href: '',
  disabled: false,
  loading: false,
  defaultStyle: '',
  children: null,
  size: '',
  onClick: () => {},
};

export default memo(Button);
