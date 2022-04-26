import React, {
  ReactNode, memo, FC, useRef,
} from 'react';
import cn from 'classnames';
import { RegisterOptions, UseFormMethods } from 'react-hook-form';
import styles from './input.module.scss';

export interface TInputProps extends Partial<Pick<UseFormMethods, 'register'>> {
  className?: string,
  value?: string | number,
  label?: ReactNode | string,
  error?: string,
  rules?: RegisterOptions;
  name: string,
  placeholder?: string,
  disabled?: boolean,
  infoPositionAbsolute?: boolean,
  rightContent?: ReactNode,
  onChange?: (value: string) => void
  type?: string,
  hint?: {text: string, list: string[]},
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
  rightContent = null,
  infoPositionAbsolute = false,
  type = 'text',
  readonly = false,
  hint,
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
          value={value}
          {...(readonly ? {
            value: value?.toString(),
            tabIndex: -1,
          } : null)}
        />
        {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
      </div>
      {(error || hint) && (
        <div className={cn(styles.infoBlock, { [styles.infoPositionAbsolute]: infoPositionAbsolute })}>
          {error && (
            <div
              className={styles.textError}
            >
              {error}
            </div>
          )}
          {hint && !error && (
            <div className={styles.hint}>
              <p>{hint.text}</p>
              <ul>
                {hint.list.map((item) => <li>{item}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Input.defaultProps = {
  className: '',
  value: undefined,
  label: '',
  error: '',
  rules: undefined,
  placeholder: '',
  disabled: false,
  infoPositionAbsolute: false,
  rightContent: undefined,
  onChange: undefined,
  type: undefined,
  hint: undefined,
  readonly: false,
};

export default memo<TInputProps>(Input);
