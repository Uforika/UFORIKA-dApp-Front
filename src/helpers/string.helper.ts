export const doEllipsisStringMiddle = (str: string, start: number, end: number):
string => `${str.substr(0, start) }...${ str.substr(str.length - end, str.length)}`;
