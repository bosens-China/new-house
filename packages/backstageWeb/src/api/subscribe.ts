import instance from '@/utils/instance.js';
import { Normal } from '@new-house/backstage-api';
import { RootData } from '@new-house/database/model/mail';

export const subscribeList = async (params: { current: number; pageSize: number }) => {
  const {
    data: { data: body },
  } = await instance.get<
    Normal<{
      total: number;
      list: Array<RootData>;
    }>
  >('/subscribe', { params });
  return body;
};

export const subscribeRemove = async (id: RootData['_id']) => {
  await instance.delete(`/subscribe/${id}`);
};
