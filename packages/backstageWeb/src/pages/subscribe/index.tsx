import React, { useState } from 'react';
import { Button, Form, Input, Space, Col, Row, Table, Tag, Popconfirm, message } from 'antd';
import { RootData } from '@new-house/database/model/mail';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { subscribeList, subscribeRemove } from '@/api/subscribe.js';
import { useAntdTable, useRequest } from 'ahooks';
import PrivateModal from './modal.js';

import type { ColumnsType } from 'antd/es/table';

const Subscribe = () => {
  const [form] = Form.useForm<RootData>();
  const columns: ColumnsType<RootData> = [
    {
      title: '邮箱地址',
      dataIndex: 'mailbox',
    },
    {
      title: '当前状态',
      key: 'disable',
      render(_, record) {
        return record.disable ? <Tag color="warning">禁用</Tag> : <Tag color="success">正常</Tag>;
      },
    },
    {
      title: '创建日期',
      key: 'createdDate',
      render(_, record) {
        return <span>{dayjs(record.createdDate).format(`YYYY-MM-DD HH:mm`)}</span>;
      },
    },

    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
              setData(record);
            }}
          >
            编辑
          </a>

          <Popconfirm
            title="提示"
            description="确认删除吗？"
            onConfirm={() => {
              run(record._id);
            }}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { tableProps } = useAntdTable(subscribeList);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<RootData>();
  const { run } = useRequest(subscribeRemove, {
    manual: true,
    onSuccess() {
      message.success('删除成功');
    },
    onError(err) {
      message.error(err.message);
    },
  });

  return (
    <>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Form layout="inline" form={form}>
          <Row style={{ width: '100%' }}>
            <Col span={7}>
              <Form.Item label="邮箱地址" name="mailbox">
                <Input placeholder="请输入搜索的邮箱地址" />
              </Form.Item>
            </Col>
            <Col flex="none">
              <Form.Item>
                <Space>
                  <Button>重置</Button>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </Space>
              </Form.Item>
            </Col>
            <Col flex="auto"></Col>
            <Col flex="none">
              <Form.Item>
                <Button type="primary" icon={<PlusOutlined />}>
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} {...tableProps} />
      </Space>
      <PrivateModal open={open} data={data} setOpen={setOpen}></PrivateModal>
    </>
  );
};

export default Subscribe;
