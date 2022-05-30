import { useRef } from 'react';

export const useFocus = () => {
  const inputRef = useRef(null);

  const setFocus = () => {
    if (inputRef.current) {
      (inputRef.current as HTMLElement).focus();
    }
  };

  return [inputRef, setFocus] as const;
};
