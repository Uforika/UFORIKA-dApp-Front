import React, {
  useRef, useState, ReactNode,
} from 'react';
import 'focus-visible/dist/focus-visible.js';
import cn from 'classnames';
import { DropdownArrow } from '@constants/icons.constants';
import DropdownMenu from './DropdownMenu';
import styles from './dropdown.module.scss';

type Props = {
  className?: string,
  selection?: boolean,
  disabled?: boolean,
  label?: string,
  options?: { value: string, content: string | ReactNode, }[],
  value?: string | ReactNode,
  placeholder?: string,
  hint?: string,
  error?: string, children?: ReactNode,
  onChange?: (value: string) => void,
  infoPositionAbsolute?: boolean,
}

type RenderValueTypes = {
  options?: { value: string, content: string | ReactNode, }[],
  value?: string | ReactNode,
  selection?: boolean,
  placeholder?: string,
}

/**
 * Для использования стандартного селекта необходимо передать пропс selection и options,
 * В противном случае надо просто передавать в <Dropdown> children компонент <DropdownMenu>, а внутрь меню <DropdownItem>
*/

const renderValue = ({
  options, value, selection, placeholder,
}: RenderValueTypes) => {
  if (!value) {
    return placeholder;
  }
  if (selection) {
    return options?.find((item) => item.value === value) ? options?.find((item) => item?.value === value)?.content : null;
  }
  return value;
};

const Dropdown = ({
  className, selection, disabled, label, options, value, placeholder,
  hint, error = '', children, onChange = () => null, infoPositionAbsolute = false,
}: Props): JSX.Element => {
  const triggerRef = useRef(null);
  const [open, toggleOpen] = useState(false);

  const handleTrigger = () => {
    toggleOpen(!open);
  };

  const renderContent = () => {
    if (selection) {
      return (
        <DropdownMenu
          triggerRef={triggerRef}
          value={value}
          onClose={() => toggleOpen(false)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-argument
          onChange={(e: string) => onChange(e)}
          options={options}
          selection={selection}
        >
          {children}
        </DropdownMenu>
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return React.Children.map(children, (child: any) => React.cloneElement(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      child,
      {
        onClose: () => toggleOpen(false),
        triggerRef,
      },
    ));
  };

  return (
    <div className={cn(styles.container, className, { [styles.error]: error })}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.buttonContainer}>
        <button
          ref={triggerRef}
          disabled={disabled}
          className={cn(styles.button, { [styles.open]: open })}
          onClick={handleTrigger}
          type="button"
        >
          <div className={cn(styles.value, { [styles.placeholder]: !value })}>
            {renderValue({
              options, value, selection, placeholder,
            })}
          </div>
          <div className={styles.arrow}>
            {DropdownArrow}
          </div>
        </button>
        {open && renderContent()}
      </div>
      {(error || hint) && (
        <div className={cn(styles.infoBlock, { [styles.infoPositionAbsolute]: infoPositionAbsolute })}>
          {error && (
            <p className={styles.textError}>
              {error}
            </p>
          )}
          {hint && !error && <p className={styles.hint}>{hint}</p>}
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  className: '',
  selection: false,
  disabled: false,
  label: '',
  options: [],
  value: '',
  placeholder: 'Choose item',
  hint: '',
  error: '',
  children: null,
  infoPositionAbsolute: false,
  onChange: () => null,
};

export default Dropdown;
