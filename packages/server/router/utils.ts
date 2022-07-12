import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { OVERDUE } from '../constant/user';
import db, { Data } from '../model/users';

const key = 'yangboses1008611';

export const encryption = (str: string) => {
  const hmac = crypto.createHmac('sha1', key);
  const result = hmac.update(str).digest('base64');
  return result;
};

export const sign = (obj: Data) => jwt.sign(obj, key, { expiresIn: '48h' });

export const verify = async (token?: string) => {
  if (!token) {
    throw new Error('请输入有效token');
  }
  let user: Data;
  try {
    user = jwt.verify(token, key) as Data;
  } catch (e) {
    const err = new Error('token已过期') as Error & { OVERDUE: symbol };
    err.OVERDUE = OVERDUE;
    throw err;
  }
  const result = await db.findOne({
    password: user.password,
    userName: user.userName,
  });
  if (!result) {
    throw new Error('用户名或者密码错误');
  }
  return result;
};
