import React, { memo } from 'react';
import cn from 'classnames';
import styles from './textarea.module.scss';

type Props = {
  className?: string,
  value?: string,
  label?: string,
  error?: string,
  placeholder?: string,
  disabled?: boolean,
  resize?: boolean,
  onChange: (value: string) => void
}

const Textarea = ({
  className, value, label, onChange, error, placeholder, disabled, resize, ...props
}: Props) => (
  <div>
    {label && <p className={styles.textLabel}>{label}</p>}
    <textarea
      value={value}
      className={cn(
        styles.textarea,
        { [styles.error]: error, [styles.textareaResize]: resize },
        className,
      )}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
    {error && <div className={styles.textError}>{error}</div>}
  </div>
);

Textarea.defaultProps = {
  className: '',
  value: '',
  label: '',
  error: '',
  placeholder: '',
  disabled: false,
  resize: false,
};

export default memo(Textarea);
