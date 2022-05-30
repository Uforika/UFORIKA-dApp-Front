import dayjs from 'dayjs';

export const formatDate = (date: string, format: string): string => dayjs(Number(date) * 1000).format(format);
