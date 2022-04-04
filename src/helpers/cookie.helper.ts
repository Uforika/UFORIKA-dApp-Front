export const EXPIRES_TIME = 10 * 365 * 24 * 3600 * 1000; // 10 years

export const formatCookieExpires = (time: number): string => (new Date(time)).toUTCString();

export const getCookieByName = (name: string): string | null => {
  const v = new RegExp(`(^|;) ?${name}=([^;]*)(;|$)`).exec(document.cookie);
  return v ? v[2] : null;
};

export const setCookieByName = (field: string, value: string, expires?: number): void => {
  const expiresTime = expires || (Date.now() + EXPIRES_TIME);
  const formatExpiresTime = formatCookieExpires(expiresTime);
  document.cookie = `${field}=${value}; expires=${formatExpiresTime}; path=/`;
};

export const removeCookieByName = (name: string): void => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};
