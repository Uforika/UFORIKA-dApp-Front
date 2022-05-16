import React, { FC, memo } from 'react';
import NextLink, { LinkProps } from 'next/link';

type Props = LinkProps

const Link: FC<Props & { children: React.ReactNode }> = ({
  children,
  ...props
}) => (
  <NextLink {...props}>
    {children}
  </NextLink>
);

export default memo(Link);
