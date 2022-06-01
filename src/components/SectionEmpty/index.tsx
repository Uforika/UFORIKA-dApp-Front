import Icon from '@components/Icon';
import { ICONS } from '@components/Icon/constants';
import Section from '@components/Section';
import React, { FC, memo } from 'react';
import styles from './styles.module.scss';

type Props = {
  title: string,
  text?: string
}

const SectionEmpty: FC<Props> = ({ title, text }) => (
  <Section className={styles.root}>
    <Icon width={32} type={ICONS.UFO_SHIP} />
    <h4 className={styles.title}>
      {title}
    </h4>
    {text ? (
      <p className={styles.text}>
        Please change the data, your filters or try different keywords.
      </p>
    ) : null}
  </Section>
);

SectionEmpty.defaultProps = {
  text: undefined,
};

export default memo(SectionEmpty);
