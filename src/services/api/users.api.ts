import { get } from '@helpers/axios.helper';
import { API_USERS_ME } from '@constants/api.constants';
import { UserDTO } from '@dtos/user.dto';

export const apiUsersGetMe = async (token?: string): Promise<UserDTO> => get<UserDTO>(
  API_USERS_ME,
  null,
  token ? { Authorization: token } : {},
);
