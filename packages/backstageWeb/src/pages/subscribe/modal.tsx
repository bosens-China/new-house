import React, { FC, useEffect, useMemo } from 'react';
import { message, Modal } from 'antd';
import { Form, Switch, InputNumber, Input } from 'antd';
import type { RootData, Data } from '@new-house/database/model/mail';
import { subscribeAdd, subscribePut } from '@/api/subscribe.js';
import { useRequest } from 'ahooks';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: RootData;
  refreshList: (add?: boolean) => void;
}

const PrivateModal: FC<Props> = (props) => {
  const { open, setOpen, data, refreshList } = props;
  const [form] = Form.useForm<
    // | Pick<Data, 'ceilingPrice' | 'floorPrice' | 'disable'>
    Pick<Data, 'ceilingPrice' | 'floorPrice' | 'disable' | 'mailbox'>
  >();

  const { run: runAdd } = useRequest(subscribeAdd, {
    manual: true,
    onSuccess() {
      message.success(`新增成功！`);
      refreshList();
      handleCancel();
    },
    onError(err) {
      message.error(err.message);
    },
  });
  const { run: runPut } = useRequest(subscribePut, {
    manual: true,
    onSuccess() {
      message.success(`编辑成功！`);
      refreshList(false);
      handleCancel();
    },
    onError(err) {
      message.error(err.message);
    },
  });

  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = async () => {
    const values = await form.validateFields();

    // 价格是万
    if (values.ceilingPrice) {
      values.ceilingPrice = values.ceilingPrice * 10000;
    }
    if (values.floorPrice) {
      values.floorPrice = values.floorPrice * 10000;
    }
    if (!data) {
      return runAdd(values);
    }
    runPut(data._id, values);
    // 必须放到最后，否则会出现表单重置
    handleCancel();
  };
  useEffect(() => {
    if (!open) {
      return form.resetFields();
    }
    const values = { ...data };
    if (values && values.ceilingPrice) {
      values.ceilingPrice = values.ceilingPrice / 10000;
    }
    if (values && values.floorPrice) {
      values.floorPrice = values.floorPrice / 10000;
    }
    return form.setFieldsValue(values as any);
  }, [open, form, data]);

  const title = useMemo(() => {
    return data ? `编辑订阅信息` : '新增订阅信息';
  }, [data]);

  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} form={form} initialValues={{ disable: false }}>
        {!data && (
          <Form.Item
            label="邮箱"
            name="mailbox"
            rules={[
              {
                type: 'string',
                message: '邮箱地址不能为空！',
                required: true,
              },
              {
                type: 'email',
                message: '邮箱格式错误',
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item label="最低价(万)" name="floorPrice">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="最高价(万)" name="ceilingPrice">
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="当前状态" name="disable" valuePropName="checked">
          <Switch checkedChildren="禁用" unCheckedChildren="正常" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PrivateModal;
