import { Response } from '@/global';
import request from '@/utils/request';

export interface PostBody {
  mailbox: string;
  region: Array<string>;
}
export const addMailbox = async (body: PostBody) => {
  const {
    data: { data },
  } = await request.post<Response<string>>('/mailbox', body);
  return data;
};

export const putMailbox = async (id: string, body: PostBody) => {
  const {
    data: { data },
  } = await request.put<Response<string>>(`/mailbox/${id}`, body);
  return data;
};

export const deleteMailbox = async (id: string) => {
  const {
    data: { data },
  } = await request.delete<Response<string>>(`/mailbox/${id}`);
  return data;
};

export interface List extends PostBody {
  parentId: string;
  _id: string;
}

export interface ListParams {
  mailbox: string;
  region: string;
}

export const listMailbox = async (params?: ListParams) => {
  const {
    data: { data },
  } = await request.get<Response<Array<List>>>(`/mailbox/`, { params });
  return data;
};
