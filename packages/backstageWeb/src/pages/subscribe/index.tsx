import React, { useState } from 'react';
import { Button, Form, Input, Space, Col, Row, Table, Tag, Popconfirm, message } from 'antd';
import type { RootData } from '@new-house/database/model/mail';
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
      title: '价格区间',
      key: 'price',
      render(_, { floorPrice, ceilingPrice }) {
        if (!floorPrice && !ceilingPrice) {
          return '';
        }
        return [floorPrice ? `${floorPrice / 10000}万` : '/', ceilingPrice ? `${ceilingPrice / 10000}万` : '/'].join(
          ' - ',
        );
      },
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
              refreshList(false);
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

  const { tableProps, search } = useAntdTable(subscribeList, {
    form,
  });
  const { submit, reset } = search;

  const { onChange, pagination } = tableProps;
  // 刷新列表
  const refreshList = (add = true) => {
    onChange({
      ...pagination,
      ...(add
        ? {
            current: 1,
          }
        : {}),
    });
  };

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

  const onNew = () => {
    setOpen(true);
    setData(undefined);
  };

  return (
    <>
      <Space direction="vertical" style={{ display: 'flex' }} size="large">
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
                  <Button type="primary" htmlType="submit" onClick={submit}>
                    查询
                  </Button>
                  <Button onClick={reset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col flex="auto"></Col>
            <Col flex="none">
              <Form.Item style={{ marginRight: 0 }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={onNew}>
                  新增
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table columns={columns} {...tableProps} />
      </Space>
      <PrivateModal open={open} data={data} setOpen={setOpen} refreshList={refreshList}></PrivateModal>
    </>
  );
};

export default Subscribe;
