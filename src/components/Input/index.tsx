import React, {
  ReactNode, memo, FC,
} from 'react';
import cn from 'classnames';
import { Input as UIInput, StrictInputProps } from 'semantic-ui-react';
import styles from './input.module.scss';

type PickedTypes = 'label' | 'className' | 'disabled' | 'type'| 'onChange'

export type TInputProps = Pick<StrictInputProps, PickedTypes> & {
  value?: string | number,
  error?: string,
  name: string,
  placeholder?: string,
  infoPositionAbsolute?: boolean,
  rightContent?: ReactNode,
  hint?: { text: string, list: string[] },
  readonly?: boolean,
}

const Input: FC<TInputProps> = ({
  className = '',
  value,
  name,
  label = '',
  onChange,
  disabled = false,
  error = '',
  placeholder = '',
  rightContent = null,
  infoPositionAbsolute = false,
  type = 'text',
  readonly = false,
  hint,
  ...props
}) => (
  <div className={styles.container}>
    {label && <label htmlFor={name} className={styles.textLabel}>{label}</label>}
    <UIInput
      id={name}
      name={name}
      className={cn(styles.inputContainer, className, { [styles.error]: error, [styles.readonly]: readonly })}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readonly}
      type={type}
      value={value}
      data-disabled={disabled}
      {...(readonly ? {
        value: value?.toString(),
        tabIndex: -1,
      } : null)}
      {...props}
    />
    {rightContent && <div className={styles.rightContent}>{rightContent}</div>}
    {(error || hint) && (
      <div className={cn(styles.infoBlock, { [styles.infoPositionAbsolute]: infoPositionAbsolute })}>
        {error && (
          <div className={styles.textError}>
            {error}
          </div>
        )}
        {hint && !error && (
          <div className={styles.hint}>
            <p>{hint.text}</p>
            <ul>
              {hint.list.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
);

Input.defaultProps = {
  value: undefined,
  error: '',
  placeholder: '',
  infoPositionAbsolute: false,
  rightContent: undefined,
  hint: undefined,
  readonly: false,
};

export default memo<TInputProps>(Input);
