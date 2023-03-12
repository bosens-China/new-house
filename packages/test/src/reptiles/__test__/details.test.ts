import { transformation } from '../../../../reptiles/src/function//details.mjs';
import html from './assets/details.js';

test(`transformation`, () => {
  const values = transformation(html);
  expect(values).toEqual({
    optionalNumber: 18,
    contactNumber: ['0551-65251111', '15155178827'],
    addressOfSalesDepartment: '合肥市滨湖新区贵州路与杭州路交口向西100米远大璟庭里城市会客厅',
    building: [
      {
        link: `https://www.hfzfzlw.com/spf/details/PSVDMr9ACoW4xu7vUyP2yLpcnn-z4sv_sBDiKYZEuxmDOhPkAQZ332XB33kYe9HEjTeR3E5F37v7DjHjzayzeYru8Q1h5QnX-c43WafZgB4lhj1bzRFcHtfyooYKQaKsz8mkn7CD-IM6ySj7EnuY94Y6cpqU_FsHKIVHWcutR80=`,
        name: '6幢',
        licence: '20230184',
      },
    ],
  });
});
