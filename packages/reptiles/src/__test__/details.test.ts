import { transformation } from '../details.mjs';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.join(__dirname, './details.html'), 'utf-8');

test(`transformation`, () => {
  const values = transformation(html);
  expect(values).toEqual({
    optionalNumber: 27,
    contactNumber: ['0551-62198888', '13515608535'],
    addressOfSalesDepartment: '包河区北京路与乌鲁木齐路交汇处',
    building: [
      {
        link: 'http://60.173.254.126:8888/details/HOwDQM2Y6VPTjkfZzKMjdYgmpPT9SUBtyl9NZZO4oHQXHR14DakOfSR6IY6HyMw0QbAM_gRw2BZDK019WcX8eWuG3hnOX3hdunTcUlBpyCMzcNfPLPyapcImrf8ne5TEK39-5ugdinws0gfi6uQGNXGa1gNyfGWmmJxVPVK836s=',
        name: 'G2幢',
        licence: '20230090',
      },
    ],
  });
});
