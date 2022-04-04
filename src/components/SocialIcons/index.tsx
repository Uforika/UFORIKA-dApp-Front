import React, { ReactNode, memo } from 'react';
import cn from 'classnames';
import styles from './social-icons.module.scss';

type Props = {
  className?: string,
  list: [
    {
      icon: ReactNode,
      href: string,
    }
  ],
}

const SocialIcons = ({ className, list, ...props }: Props) => (
  <div className={cn(styles.wrapper)}>
    {list.map(({ icon, href }) => (
      <a key={href} href={href} target="_blank" rel="noreferrer" className={cn(styles.item, className)} {...props}>
        {icon}
      </a>
    ))}
  </div>
);

SocialIcons.defaultProps = {
  className: '',
};

export default memo(SocialIcons);
