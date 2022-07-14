import { Col, Row, Input, Form, Button, message } from 'antd';
import React, { useMemo, useState } from 'react';
import { View as Root, Style } from '@/components/shadowView';
import moment from 'moment';
import _ from 'lodash-es';
import { getTemplate, putTemplate } from '@/api/config';
import { useRequest } from 'ahooks';
import { onError } from './timing';

const { TextArea } = Input;

interface Values {
  html: string;
  style: string;
}

interface Data {
  // 名称
  name: string;
  // 链接地址
  url: string;
  // 区域
  region: string;
  // 开始时间
  startTimeStr: string;
  // 结束时间
  endTimeStr: string;
  // 总套数
  total: number;
  // 企业名称
  enterpriseName: string;
  // 楼栋
  building: Array<string>;
  // 登记状态
  state: '正在登记' | '暂未开始' | '登记结束';
}

const falseData: Array<Data> = [
  {
    name: '云际轩',
    url: 'http://60.173.254.126:8888/detail/viewscheme/543',
    region: '滨湖区',
    startTimeStr: moment(1655949600000).format('YYYY-MM-DD HH:mm:ss'),
    endTimeStr: moment(1656208800000).format('YYYY-MM-DD HH:mm:ss'),
    total: 60,
    building: ['9幢'],
    enterpriseName: '合肥卓灿房地产开发有限公司',
    state: '登记结束',
  },
  {
    name: '璟峰里',
    url: 'http://60.173.254.126:8888/detail/viewscheme/541',
    region: '包河区',
    startTimeStr: moment(1655776800000).format('YYYY-MM-DD HH:mm:ss'),
    endTimeStr: moment(1656036000000).format('YYYY-MM-DD HH:mm:ss'),
    total: 300,
    building: ['二期3幢', '二期5幢', '二期6幢'],
    enterpriseName: '合肥骏沃房地产开发有限公司',
    state: '登记结束',
  },
];

const View = () => {
  const [form] = Form.useForm();
  const [html, setHtml] = useState('');
  const [style, setStyle] = useState('');
  const [open, setOpen] = useState(false);
  const onValuesChange = (_value: unknown, values: Values) => {
    setHtml(values.html);
    setStyle(values.style);
  };
  useRequest(getTemplate, {
    onError,
    onSuccess(data) {
      form.setFieldsValue(data);
      onValuesChange({}, data as Values);
    },
  });

  const code = useMemo(() => {
    try {
      const compiled = _.template(html);
      const data = compiled({ data: falseData, newDate: falseData });
      return data;
    } catch (e) {
      return html;
    }
  }, [html]);

  const { run, loading } = useRequest(putTemplate, {
    manual: true,
    onError,
    onSuccess() {
      message.success(`提交成功`);
    },
  });
  const onFinish = (values: Values) => {
    run(values);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onValuesChange={onValuesChange}
      form={form}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="提示">
            <div>
              为了方便使用，可以在模板中使用
              <a href="https://www.lodashjs.com/docs/lodash.template" target="_blank" rel="noreferrer">
                lodahs.template
              </a>
              支持的语法。暴露的变量名称为data，请通过data[0].xx的形式来引用数据
            </div>
            <div>
              为了方便调用，内置了两条静态数据
              <div
                style={{
                  display: open ? undefined : 'none',
                  wordBreak: 'break-all',
                }}
              >
                {JSON.stringify(falseData)}
              </div>
              <a href="javascript:" onClick={() => setOpen(!open)}>
                {open ? '点击收起' : '点击查看'}
              </a>
            </div>
          </Form.Item>
          <Form.Item
            label="html"
            name="html"
            rules={[
              {
                required: true,
                message: '不可省略推送模板',
              },
            ]}
          >
            <TextArea placeholder="在此输入html代码代码" rows={8} />
          </Form.Item>
          <Form.Item label="style代码" name="style">
            <TextArea placeholder="在此输入自定义样式，style标签不需要添加" rows={5} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
            <h4>效果预览：</h4>
            <Root>
              {code}
              <Style>{style}</Style>
            </Root>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button htmlType="submit" type="primary" loading={loading} style={{ marginLeft: '-6px' }}>
          提交更改
        </Button>
      </Form.Item>
    </Form>
  );
};

export default View;
