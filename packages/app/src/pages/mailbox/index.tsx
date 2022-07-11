import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Row, Space, Table, Popconfirm, message, Select, Tag } from 'antd';
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { listMailbox, List, deleteMailbox, ListParams } from '@/api/mailbox';
import { ColumnsType } from 'antd/lib/table';
import Modal from './modal';

import './style.less';
import { region } from './constant';

const { Option } = Select;

const View = () => {
  const [form] = Form.useForm();
  const { loading, data, run, refresh } = useRequest(listMailbox, {
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
  });
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState<List>();
  const onNew = () => {
    setCurrent(undefined);
    setVisible(true);
  };
  const { run: deleteRun } = useRequest(deleteMailbox, {
    manual: true,
    onSuccess() {
      message.success(`删除成功`);
    },
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
  });
  const columns: ColumnsType<List> = [
    {
      title: '邮箱地址',
      dataIndex: 'mailbox',
    },
    {
      title: '订阅区域',
      key: 'region',
      render(item: List) {
        return (
          <>
            {item.region.map((label) => (
              <Tag key={label}>{label}</Tag>
            ))}
          </>
        );
      },
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 200,
      render(item: List) {
        const onUpdate = () => {
          setCurrent(item);
          setVisible(true);
        };
        const onDelete = () => {
          deleteRun(item._id);
          refresh();
        };
        return (
          <Space>
            <a href="javascript:" onClick={onUpdate}>
              更新
            </a>
            <Popconfirm title="确定删除该条数据吗" onConfirm={onDelete}>
              <a href="javascript:">删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const onFinish = (values: ListParams) => {
    run(values);
  };
  const onReset = () => {
    form.resetFields();
    run();
  };

  return (
    <>
      <div className="mailbox">
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{
            region: 'all',
          }}
        >
          <Row gutter={12}>
            <Col flex="auto">
              <Form.Item label="邮箱地址" name="mailbox">
                <Input placeholder="请输入查找邮箱地址" />
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item label="订阅区域" name="region">
                <Select>
                  <Option value="all">所有区域</Option>
                  {region.map(({ label, value }) => (
                    <Option value={value} key={value}>
                      {label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col flex="auto">
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    查找
                  </Button>
                  <Button onClick={onReset}>重置</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col flex="none">
              <Form.Item>
                <Space>
                  <Button icon={<PlusOutlined />} type="primary" onClick={onNew}>
                    新增
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          rowKey="_id"
          bordered
          columns={columns}
          dataSource={data}
          loading={loading}
          sticky
          scroll={{
            y: `calc(100vh - 330px)`,
          }}
          pagination={{
            showTotal(total) {
              return `共计：${total} 条数据`;
            },
          }}
        />
      </div>

      <Modal refresh={refresh} current={current} visible={visible} setVisible={setVisible} />
    </>
  );
};

export default View;
