import { Response } from '@/global';
import request from '@/utils/request';

export const getCrontab = async () => {
  const {
    data: { data },
  } = await request.get<Response<string | undefined>>('/config/crontab');
  return data;
};
export const putCrontab = async (crontab: string) => {
  const {
    data: { data },
  } = await request.put<Response<string>>('/config/crontab', { crontab });
  return data;
};

interface TemplateBody {
  html?: string;
  style?: string;
}

export const getTemplate = async () => {
  const {
    data: { data },
  } = await request.get<Response<TemplateBody>>('/config/template');
  return data;
};

export const putTemplate = async (body: Required<TemplateBody>) => {
  const {
    data: { data },
  } = await request.put<Response<string>>('/config/template', body);
  return data;
};
