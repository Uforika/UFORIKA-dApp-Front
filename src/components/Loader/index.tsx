import React, { FC, memo } from 'react';
import { Loader as UILoader, StrictLoaderProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type Props = StrictLoaderProps

const Loader: FC<Props> = ({ ...props }) => (
  <UILoader className={styles.root} {...props} />
);

export default memo(Loader);
