import React, {
  useEffect, useRef, ReactNode, useCallback,
} from 'react';
import cn from 'classnames';
import DropdownItem from '../DropdownItem';
import styles from './dropdown-menu.module.scss';

type Props = {
  className?: string,
  onClose: () => void,
  value?: string | ReactNode,
  position?: 'top' | 'right' | 'left' | 'bottom',
  options?: [{
    value: string,
    content: string | ReactNode,
  }],
  selection?: boolean,
  onChange: (value: string) => void,
  children?: ReactNode,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  triggerRef: any,
}

const DropdownMenu = ({
  className, onClose, triggerRef, value, position, options, selection, onChange, children,
}: Props): JSX.Element => {
  const menuRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = useCallback((e: {target: any}) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (menuRef?.current?.contains(e.target) || triggerRef.current.contains(e.target)) {
      return;
    }
    onClose();
  }, [menuRef, onClose, triggerRef]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <div ref={menuRef} className={cn(styles.container, className, styles[position || ''])}>
      {selection ? options?.map((item) => (
        <DropdownItem
          key={item.value}
          active={item.value === value}
          onClick={() => { onChange(item.value); onClose(); }}
        >
          {item.content}
        </DropdownItem>
      )) : (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        React.Children.map(children, (child: any) => React.cloneElement(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          child,
          {
            onClick: () => {
              if (child.props.onClick) {
                child.props.onClick();
              }
              onClose();
            },
          },
        ))
      )}
    </div>
  );
};

DropdownMenu.defaultProps = {
  className: '',
  position: 'left',
  selection: false,
  value: '',
  children: null,
  options: [],
};

export default DropdownMenu;
