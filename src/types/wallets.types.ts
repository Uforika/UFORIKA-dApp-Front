import { LOGIN_PROVIDER } from '@constants/wallets.constants';
import { TOKEN } from '@constants/token.constants';
import BigNumber from 'bignumber.js';

type LoginPayloadType = {
  [LOGIN_PROVIDER.EMAIL_PASSWORDLESS]: string,
} & {
  [key in Exclude<LOGIN_PROVIDER, LOGIN_PROVIDER.EMAIL_PASSWORDLESS>]: undefined
}

export type ConnectType = <LoginProviderType extends keyof LoginPayloadType>
(loginProvider: LoginProviderType, loginPayload: LoginPayloadType[LoginProviderType]) => Promise<void>;

export type GetBalanceType = (address: string | null, tokenName: TOKEN, setBalance: (value: BigNumber) => void) => void;
