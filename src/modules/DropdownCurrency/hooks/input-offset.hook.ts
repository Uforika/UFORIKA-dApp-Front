import { useEffect, useRef, useState } from 'react';

const DROPDOWN_ICON_WIDTH = 16;
const OFFSET = 16;

export const useInputOffset = (activeOptionId: string | null) => {
  const triggerRef = useRef<HTMLDivElement>(null);

  const [inputOffset, setInputOffset] = useState(0);

  useEffect(() => {
    if (!triggerRef.current) {
      return;
    }

    const width = triggerRef.current.clientWidth;
    setInputOffset(width + DROPDOWN_ICON_WIDTH + OFFSET * 2);
  }, [triggerRef, activeOptionId]);

  return {
    triggerRef,
    inputOffset,
  };
};
