/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import cn from 'classnames';
import FilePreview from './FilePreview';
import styles from './file-loader.module.scss';

const DROP = 'drop';
const CHANGE = 'change';

type Props = {
  className?: string,
  loading?: boolean,
  text?: string,
  label?: string,
  selectedFile?: {
    name?: string,
    size?: number,
  } | null,
  errorMessage?: string,
  fileFormat?: string,
  removeFile: (selectedFile: { name?: string, size?: number }) => void,
  onChange: (file: FileList | null) => void,
}

type Event = {
  preventDefault(): void,
  type: string;
  dataTransfer: {
    files: FileList
  }
}

const FileLoader = ({
  loading, label, text, className, selectedFile, errorMessage, fileFormat, removeFile, onChange,
}: Props): JSX.Element => {
  const [isOnDrag, setOnDrag] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileSelected = (e: Event) => {
    e.preventDefault();
    let file = null;
    if (e.type === DROP) {
      const { files } = e.dataTransfer;
      file = files;
    }
    if (e.type === CHANGE && fileInputRef?.current?.files?.length) {
      file = fileInputRef.current.files;
    }
    onChange(file);
    setOnDrag(false);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.upload}>
          <div className={styles.loading} />
          <div>Keystore File Uploading....</div>
        </div>
      );
    }
    if (selectedFile) {
      return (
        <FilePreview
          fileName={selectedFile.name || 'Uploaded file'}
          error={errorMessage || ''}
          removeFile={() => removeFile(selectedFile)}
        />
      );
    }
    return (
      <label
        className={styles.message}
        onDragOver={(e) => { e.preventDefault(); setOnDrag(true); }}
        onDragLeave={() => setOnDrag(false)}
        onDrop={(e: Event) => fileSelected(e)}
      >
        <div className={styles.text}>{text}</div>
        <input
          ref={fileInputRef}
          className={styles.input}
          type="file"
          accept={fileFormat}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument
          onChange={(e: Event | any) => fileSelected(e)}
        />
      </label>
    );
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={cn(
        styles.container,
        { [styles.drag]: isOnDrag, [styles.loading]: loading, [styles.selected]: selectedFile || errorMessage },
      )}
      >
        {renderContent()}
      </div>
    </div>
  );
};

FileLoader.defaultProps = {
  text: 'Drop here or click to upload keystore file',
  label: '',
  className: '',
  selectedFile: null,
  errorMessage: '',
  loading: false,
  fileFormat: '.png, .jpeg, .jpg, .svg',
};

export default FileLoader;
