import request from '../utils/request.mjs';

export const getList = async (page = 1) => {
  const { data } = await request.get<string>(`/?p=${page}&xmmc=&qy=&djzt=`);
  return data;
};
