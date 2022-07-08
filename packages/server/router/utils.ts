import crypto from 'crypto';
import randomkey from 'randomkey';
import jwt from 'jsonwebtoken';

export const encryption = (str: string) => {
  const hmac = crypto.createHmac('sha1', randomkey());
  const result = hmac.update(str).digest('base64');
  return result;
};

const key = 'yangboses1008611';

export const sign = (obj: Record<string, any>) => jwt.sign(obj, key, { expiresIn: '48h' });

export const verify = <T = Record<string, any>>(token: string) => {
  const decoded = jwt.verify(token, key);
  return decoded as T;
};
