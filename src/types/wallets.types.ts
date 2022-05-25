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

export type TransferMethodType = <T>
(tokenName: TOKEN, data: unknown[], from: string | null, method: 'send' | 'estimateGas') => Promise<T | undefined>;

export type GetBalanceType = (address: string | null, tokenName: TOKEN, setBalance: (value: BigNumber) => void) => void;
