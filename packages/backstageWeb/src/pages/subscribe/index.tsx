import React, { useState } from 'react';
import { Button, Form, Input, Space, Col, Row, Table, Popconfirm, message, Switch } from 'antd';
import type { RootData } from '@new-house/database/model/mail';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { subscribeList, subscribeRemove, subscribeSwitchState, subscribeRepeat } from '@/api/subscribe.js';
import { useAntdTable, useMap, useRequest } from 'ahooks';
import PrivateModal from './modal.js';

import type { ColumnsType } from 'antd/es/table';

const Subscribe = () => {
  const [form] = Form.useForm<RootData>();

  const [status, { set: setStatus, get: getStatus, reset: resetStatus }] = useMap<string, { loading: boolean }>();

  const { run: runState } = useRequest(subscribeSwitchState, {
    manual: true,
    onBefore([id]) {
      // 考虑下可能得内存泄漏
      if (status.size >= 1000) {
        resetStatus();
      }
      setStatus(`${id}`, {
        loading: true,
      });
    },
    onSuccess() {
      message.success('操作成功');
    },
    onError(err) {
      message.error(err.message);
    },
    onFinally([id]) {
      setStatus(`${id}`, {
        loading: false,
      });
    },
  });
  // 重发邮件
  const { run: runRepeat } = useRequest(subscribeRepeat, {
    manual: true,
    onSuccess() {
      message.success(`重发邮件成功`);
    },
    onError(e) {
      message.error(e.message);
    },
  });

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
      title: '订阅邮件状态',
      key: 'disable',
      render(_, record) {
        const { loading } = getStatus(`${record._id}`) || {};
        return (
          <Switch
            checked={!record.disable}
            loading={loading}
            onChange={() => {
              runState(record._id, !record.disable);
              refreshList(true);
            }}
          />
        );
        // return record.disable ? <Tag color="warning">禁用</Tag> : <Tag color="success">正常</Tag>;
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
            style={{
              cursor: record.disable ? 'not-allowed' : undefined,
            }}
            onClick={(e) => {
              e.preventDefault();
              if (record.disable) {
                return;
              }
              runRepeat(record.mailbox);
            }}
          >
            重发邮件
          </a>
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
              refreshList(true);
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
  const refreshList = (beforeOne = true) => {
    onChange({
      ...pagination,
      ...(!beforeOne
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
