import React, { FC, memo, ReactNode } from 'react';
import { Label as LabelUI, StrictLabelProps } from 'semantic-ui-react';
import styles from './styles.module.scss';

type PickedTypes = 'as' | 'color'

export type Props = Pick<StrictLabelProps, PickedTypes> & {
  children: ReactNode
}

const Label: FC<Props> = ({ children, ...props }) => (
  <LabelUI className={styles.label} {...props}>{children}</LabelUI>
);

export default memo(Label);
