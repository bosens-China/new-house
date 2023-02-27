import instance from '@/utils/instance.js';
import type { Normal } from '@new-house/backstage-api';
import type { RootData, Data } from '@new-house/database/model/mail';

export const subscribeList = async (params: { current: number; pageSize: number }, form: { mailbox?: string }) => {
  const {
    data: { data: body },
  } = await instance.get<
    Normal<{
      total: number;
      list: Array<RootData>;
    }>
  >('/subscribe', {
    params: {
      ...params,
      ...form,
    },
  });
  return body;
};

export const subscribeRemove = async (id: RootData['_id']) => {
  await instance.delete<Normal<string>>(`/subscribe/${id}`);
};

export const subscribeAdd = async (body: Omit<Data, 'createdDate'>) => {
  const {
    data: { data },
  } = await instance.post<Normal<string>>(`/subscribe`, body);
  return data;
};

export const subscribePut = async (id: RootData['_id'], body: Omit<Data, 'createdDate' | 'disable'>) => {
  const {
    data: { data },
  } = await instance.put<Normal<string>>(`/subscribe/${id}`, body);
  return data;
};
