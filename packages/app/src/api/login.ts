import { Response } from '@/global';
import request from '@/utils/request';

export interface RegisterBody {
  userName: string;
  password: string;
}
// 登录
export const signIn = async (body: RegisterBody) => {
  const {
    data: { data },
  } = await request.post<Response<string>>('/users/signIn', body);
  return data;
};

// 注册
export const register = async (body: RegisterBody) => {
  const {
    data: { data },
  } = await request.post<Response<{ token: string }>>('/users/register', body);
  return data;
};
