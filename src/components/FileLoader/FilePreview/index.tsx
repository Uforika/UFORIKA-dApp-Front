import React, { memo } from 'react';
import { CheckIcon, AttentionIcon, RemoveIcon } from '../../../constants/icons.constants';
import styles from './file-preview.module.scss';

type Props = {
  fileName: string,
  error: string,
  removeFile: () => void
}

const FilePreview = ({ fileName, error, removeFile }: Props) => (
  <div className={styles.container}>
    <div className={styles.icon}>{error ? AttentionIcon : CheckIcon}</div>
    <div className={styles.info}>
      <p className={styles.title}>{error || fileName }</p>
      <span className={styles.subtitle}>{error ? 'Please try again' : 'Uploaded successfully'}</span>
    </div>
    {!error && fileName && (
      <button type="button" className={styles.remove} onClick={() => removeFile()}>
        {RemoveIcon}
      </button>
    )}
  </div>
);

export default memo(FilePreview);
