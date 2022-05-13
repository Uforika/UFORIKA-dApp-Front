import React, { memo } from 'react';
import {
  PATH_PRIVACY, PATH_TERMS,
} from '@constants/routes.constants';
import styles from './styles.module.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <p>© 2022 Uforika</p>
    <div className={styles.footerLinks}>
      <a target="_blank" href={PATH_TERMS} rel="noreferrer">Terms & Conditions</a>
      <a target="_blank" href={PATH_PRIVACY} rel="noreferrer">Privacy Policy</a>
    </div>
  </footer>
);

export default memo(Footer);
