import { Form, Row, Col, InputNumber, Button, message, Input } from 'antd';
import React, { useState } from 'react';
// import _ from 'lodash-es';
import { useRequest } from 'ahooks';
import { getCrontab, putCrontab } from '@/api/config';

/* 
* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ │
│ │ │ │ │ └ 星期几（0 - 6）（0为星期天）
│ │ │ │ └───── 月 (1 - 12)
│ │ │ └────────── 一个月中的某天 (1 - 31)
│ │ └─────────────── 小时 (0 - 23)
│ └──────────────────── 分钟 (0 - 59)
└────────────────────────── 秒（0 - 59，可选）
https://github.com/node-schedule/node-schedule
基于此格式来定制
*/

export const onError = (err: Error) => {
  message.error(err instanceof Error ? err.message : `${err}`);
};
interface Values {
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  dayOfWeek: number;
  crontab: string;
}

const View = () => {
  const [form] = Form.useForm();
  const [crontab, setCrontab] = useState('');

  // 每次操作的时候都清空错误
  const onValuesChange = (changevalue: Partial<Values>) => {
    if ('crontab' in changevalue) {
      return;
    }

    form.setFields(
      form.getFieldsError().map((f) => ({
        ...f,
        errors: [],
      })),
    );
    const {
      month = '*',
      day = '*',
      hour = '*',
      minute = '*',
      second = '*',
      dayOfWeek,
    } = form.getFieldsValue(true) as Values;
    const value = [second, minute, hour, day, month, dayOfWeek].filter((f) => f).join(' ');
    form.setFieldsValue({
      crontab: value,
    });
    setCrontab(value);
  };

  useRequest(getCrontab, {
    onSuccess(data) {
      form.setFieldsValue({
        crontab: data || '',
      });
    },
    onError,
  });

  const { loading, run } = useRequest(putCrontab, {
    manual: true,
    onSuccess() {
      message.success(`提交成功`);
    },
    onError,
  });
  const onFinish = (values: Values) => {
    run(values.crontab);
  };
  return (
    <Form
      form={form}
      onValuesChange={onValuesChange}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Row>
        <Col span={4}>
          <Form.Item label="月" extra="范围1-12" name="month">
            <InputNumber min={1} max={12} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="日" extra="范围1-31" name="day">
            <InputNumber min={1} max={31} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="小时" extra="范围0-23" labelCol={{ span: 4 }} name="hour">
            <InputNumber min={0} max={23} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Form.Item label="分钟" extra="范围0-59" name="minute">
            <InputNumber min={0} max={59} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="秒" extra="0-59" name="second">
            <InputNumber min={0} max={59} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="星期几" extra="范围0-7，1为周一，0和7为星期天" labelCol={{ span: 4 }} name="dayOfWeek">
            <InputNumber min={0} max={7} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item label="当前crontab值" labelCol={{ span: 3 }}>
        <span>{crontab}</span>
      </Form.Item>
      <Form.Item
        label="高级玩法"
        labelCol={{ span: 3 }}
        extra="如上述简单设置不能满足，可以在此自定义"
        wrapperCol={{ span: 10 }}
        name="crontab"
        rules={[{ message: 'crontab不能为空！', required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 1 }}>
        <Button htmlType="submit" type="primary" loading={loading}>
          提交更改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default View;
