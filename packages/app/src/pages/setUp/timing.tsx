import { Form, Row, Col, InputNumber, Button } from 'antd';
import React, { useMemo, useState } from 'react';
import _ from 'lodash-es';

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

interface Values {
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  dayOfWeek: number;
}

const View = () => {
  const [form] = Form.useForm();
  // 月、日、小时、分钟和秒中必须存在一个值
  // eslint-disable-next-line @typescript-eslint/require-await
  const validator = async () => {
    const values = form.getFieldsValue(true) as Values;

    const result = _.values(_.omit(values, ['dayOfWeek'])).every((f) => !f);
    if (result) {
      throw new Error(`月、日、小时、分钟和秒中必须存在一个值！`);
    }
  };
  const [crontab, setCrontab] = useState('');
  // 每次操作的时候都清空错误
  const onValuesChange = () => {
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
    setCrontab([second, minute, hour, day, month, dayOfWeek].filter((f) => f).join(' '));
  };
  const onFinish = () => {};

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
          <Form.Item
            label="月"
            extra="范围1-12"
            name="month"
            rules={[
              {
                validator,
              },
            ]}
          >
            <InputNumber min={1} max={12} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="日"
            extra="范围1-31"
            name="day"
            rules={[
              {
                validator,
              },
            ]}
          >
            <InputNumber min={1} max={31} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="小时"
            extra="范围0-23"
            labelCol={{ span: 4 }}
            name="hour"
            rules={[
              {
                validator,
              },
            ]}
          >
            <InputNumber min={0} max={23} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          <Form.Item
            label="分钟"
            extra="范围0-59"
            name="minute"
            rules={[
              {
                validator,
              },
            ]}
          >
            <InputNumber min={0} max={59} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            label="秒"
            extra="0-59"
            name="second"
            rules={[
              {
                validator,
              },
            ]}
          >
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
      <Form.Item>
        <Button htmlType="submit" type="primary">
          提交更改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default View;
