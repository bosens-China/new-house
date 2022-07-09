import React, { FC, useMemo } from 'react';
import { addMailbox, List, putMailbox } from '@/api/mailbox';
import { Modal, Form, Input, message } from 'antd';
import { useRequest } from 'ahooks';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  current?: List;
  refresh: () => void;
}
const View: FC<Props> = (props) => {
  const { visible, setVisible, current, refresh } = props;
  const [form] = Form.useForm();
  const edit = useMemo(() => !!current?._id, [current]);
  const handleCancel = () => {
    setVisible(false);
  };
  const title = useMemo(() => (edit ? '编辑邮箱地址' : '新增邮箱地址'), [edit]);
  const { run: runAdd, loading: loadingAdd } = useRequest(addMailbox, {
    manual: true,
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
    onSuccess() {
      message.success('新增邮箱地址成功');
      handleCancel();
      refresh();
    },
  });
  const { run: runPut, loading: loadingPut } = useRequest(putMailbox, {
    manual: true,
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
    onSuccess() {
      message.success('更新邮件地址成功');
      handleCancel();
      refresh();
    },
  });

  const handleOk = async () => {
    const values = (await form.validateFields()) as { mailbox: string };
    if (edit) {
      return runPut(current!._id, values);
    }
    return runAdd(values);
  };

  return (
    <Modal
      destroyOnClose
      width={600}
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loadingAdd || loadingPut}
    >
      <Form preserve={false} labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
        <Form.Item
          label="邮箱地址"
          name="mailbox"
          rules={[
            { required: true, message: '邮箱地址不能为空!' },
            { type: 'email', message: '邮箱格式错误!' },
          ]}
        >
          <Input placeholder="请输入邮箱地址" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default View;
