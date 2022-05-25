import React, { FC, memo } from 'react';
import Header from '@components/Header';
import Label from '@components/Label';
import styles from './styles.module.scss';

const UiKitLabels: FC = () => (
  <div className={styles.root}>
    <Header className={styles.title} as="h2">Labels</Header>
    <Label color="grey">WAITING...</Label>
    <Label color="green">SUCCESS</Label>
    <Label color="red">FAIL</Label>
  </div>
);

export default memo(UiKitLabels);
