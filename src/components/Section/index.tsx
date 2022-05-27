import React, { FC, ReactNode, memo } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';

type Props = {
  children: ReactNode
  className?: string
}

const Section: FC<Props> = ({ children, className }) => (
  <div className={cn(className, styles.root)}>{children}</div>
);

Section.defaultProps = {
  className: undefined,
};

export default memo(Section);
