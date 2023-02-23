import React, { FC, useEffect, useMemo } from 'react';
import { Modal } from 'antd';
import { Form, Switch, InputNumber } from 'antd';
import { RootData, Data } from '@new-house/database/model/mail';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: RootData;
}

const PrivateModal: FC<Props> = (props) => {
  const { open, setOpen, data } = props;
  const [form] = Form.useForm<Pick<Data, 'ceilingPrice' | 'floorPrice' | 'disable'>>();
  const handleCancel = () => {
    setOpen(false);
  };
  const handleOk = () => {
    handleCancel();
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const title = useMemo(() => {
    return data ? `编辑订阅信息` : '新增订阅信息';
  }, [data]);

  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 19 }} form={form} initialValues={{ disable: false }}>
        <Form.Item label="最低价" name="floorPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item label="最高价" name="ceilingPrice">
          <InputNumber />
        </Form.Item>
        <Form.Item label="当前状态" name="ceilingPrice" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PrivateModal;
