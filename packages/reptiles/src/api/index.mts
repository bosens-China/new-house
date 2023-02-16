import request from '../utils/request.mjs';
import { Houses } from '@new-house/database/model/building';

export const getList = async (page = 1) => {
  const { data } = await request.get<string>(`/?p=${page}&xmmc=&qy=&djzt=`);
  return data;
};

export const getDetails = async (url: string) => {
  const { data } = await request.get<string>(url);
  return data;
};

export const getBuilding = async (url: string) => {
  const { data } = await request.get<string>(url);
  return data;
};

// 获取房屋信息
export const getHouses = async (key: string) => {
  const {
    data: { id },
  } = await request.get<{ id: string; state: boolean }>(`/details/getrsa/${nscaler(key)}`);
  const {
    data: { data },
  } = await request.get<{ data: Houses; state: boolean }>(`/details/house/${id}`);
  return data;
};

function nscaler(a: string) {
  let b = '';
  const ar = String(a).split('');
  ar.forEach(function (e) {
    switch (e) {
      case '0':
        b += '0';
        break;
      case '1':
        b += '2';
        break;
      case '2':
        b += '5';
        break;
      case '3':
        b += '8';
        break;
      case '4':
        b += '6';
        break;
      case '5':
        b += '1';
        break;
      case '6':
        b += '3';
        break;
      case '7':
        b += '4';
        break;
      case '8':
        b += '9';
        break;
      case '9':
        b += '7';
        break;
    }
  });
  return b;
}
