export enum LOGIN_PROVIDER {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  REDDIT = 'reddit',
  DISCORD = 'discord',
  TWITCH = 'twitch',
  APPLE = 'apple',
  LINE = 'line',
  GITHUB = 'github',
  KAKAO = 'kakao',
  LINKEDIN = 'linkedin',
  TWITTER = 'twitter',
  WEIBO = 'weibo',
  WECHAT = 'wechat',
  EMAIL_PASSWORDLESS = 'email_passwordless',
  WEBAUTHN = 'webauthn',
  JWT = 'jwt',
  METAMASK = 'metamask',
}

type LOGIN_PAYLOAD_TYPE = {
  [LOGIN_PROVIDER.EMAIL_PASSWORDLESS]: string,
} & {
  [key in Exclude<LOGIN_PROVIDER, LOGIN_PROVIDER.EMAIL_PASSWORDLESS>]: undefined
}

export type CONNECT_TYPE = <LOGIN_PROVIDER_TYPE extends keyof LOGIN_PAYLOAD_TYPE>
(loginProvider: LOGIN_PROVIDER_TYPE, loginPayload: LOGIN_PAYLOAD_TYPE[LOGIN_PROVIDER_TYPE]) => Promise<void>
