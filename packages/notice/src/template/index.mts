import template from './index.ejs';
import ejs from 'ejs';
import { Data } from '@new-house/database/model/list';

export default (data: Array<Data>) => {
  const html = ejs.render(template, { data });
  return html;
};
