import { RefObject } from 'react';

export const HISTORY_TABLE_ROW_HEIGHT = 74;
export const HISTORY_TABLE_HEAD_HEIGHT = 188;
export const HISTORY_TABLE_SPACE_HEIGHT = 40;

export const getItemSize = (transactionsLength: number) => (index: number) => {
  switch (index) {
    case 0:
      return HISTORY_TABLE_HEAD_HEIGHT + HISTORY_TABLE_ROW_HEIGHT;
    case transactionsLength - 1:
      return HISTORY_TABLE_ROW_HEIGHT + HISTORY_TABLE_SPACE_HEIGHT;
    default:
      return HISTORY_TABLE_ROW_HEIGHT;
  }
};

export const handleScroll = (scrollPanel: RefObject<HTMLDivElement>) => (event: {scrollOffset: number}) => {
  if (!scrollPanel.current) {
    return;
  }

  scrollPanel.current.style.transform = `translateY(-${event.scrollOffset }px)`;

};
