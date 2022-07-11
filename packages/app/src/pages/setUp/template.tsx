import { Col, Row, Input, Form } from 'antd';
import React from 'react';
import { View as Root } from '@/components/shadowView';

const { TextArea } = Input;

const View = () => (
  <Row gutter={24}>
    <Col span={12}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
        <Form.Item label="提示">
          <div>下方的html代码</div>
        </Form.Item>
        <Form.Item label="html" name="html">
          <TextArea placeholder="在此输入html代码代码" rows={4} />
        </Form.Item>
        <Form.Item label="style代码" name="style">
          <TextArea placeholder="在此输入自定义样式，style标签不需要添加" rows={4} />
        </Form.Item>
      </Form>
    </Col>
    <Col span={12}>
      <Form layout="vertical">
        <Form.Item label="效果预览">
          <Root>
            123
            <span>test</span>
          </Root>
        </Form.Item>
      </Form>
    </Col>
  </Row>
);

export default View;
