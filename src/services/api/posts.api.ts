import { get } from '@helpers/axios.helper';
import { PostDTO } from '@dtos/post.dto';
import useSWR from 'swr';
import { API_POSTS_LIST } from '@constants/api.constants';

export const useApiPosts = (storeId?: number): PostDTO[] => {
  const { data } = useSWR<PostDTO[]>(`${API_POSTS_LIST}?storeId=${storeId || ''}`, get, {

  });
  return data || [];
};
