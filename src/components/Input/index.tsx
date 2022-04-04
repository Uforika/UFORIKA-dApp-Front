import React, {
  ReactNode, memo, FC, useRef,
} from 'react';
import cn from 'classnames';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';
import styles from './input.module.scss';

interface TInputProps extends Partial<Pick<UseFormMethods, 'register'>> {
  className?: string,
  value?: string | number | null,
  label?: ReactNode | string,
  error?: string,
  rules?: RegisterOptions;
  name: string,
  placeholder?: string,
  disabled?: boolean,
  errorPositionAbsolute?: boolean,
  rightContent?: ReactNode,
  leftContent?: ReactNode,
  onChange?: (value: string) => void
  type?: string,
  readonly?: boolean,
}

const Input: FC<TInputProps> = ({
  className = '',
  register = null,
  rules = null,
  value = '',
  name,
  label = '',
  onChange = null,
  disabled = false,
  error = '',
  placeholder = '',
  leftContent = null,
  rightContent = null,
  errorPositionAbsolute = false,
  type = 'text',
  readonly = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initRegister = (ref: HTMLInputElement | null) => {
    if (!ref || !register) return;
    if (rules) register(ref, rules);
    else register(ref);
    inputRef.current = ref;
  };

  return (
    <div className={styles.containerWrapper}>
      {label && <label htmlFor={name} className={styles.textLabel}>{label}</label>}
      <div
        className={cn(styles.inputWrapper, className, { [styles.error]: error, [styles.readonly]: readonly })}
        data-disabled={disabled}
      >
        {leftContent && <div className={styles.leftContent}>{leftContent}</div>}
        <input
          ref={initRegister}
          id={name}
          name={name}
          className={styles.input}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readonly}
          type={type}
          {...(readonly ? {
            value: value?.toString(),
            tabIndex: -1,
          } : null)}
        />
        {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
      </div>
      {error && <div className={cn(styles.textError, { [styles.errorPositionAbsolute]: errorPositionAbsolute })}>{error}</div>}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  value: null,
  label: '',
  error: '',
  rules: undefined,
  placeholder: '',
  disabled: false,
  errorPositionAbsolute: false,
  rightContent: undefined,
  leftContent: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: () => {},
  type: undefined,
  readonly: false,
};

export default memo<TInputProps>(Input);
