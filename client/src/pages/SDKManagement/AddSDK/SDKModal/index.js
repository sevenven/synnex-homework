import React from "react";
import { inject, observer } from 'mobx-react';
import { Form, Input } from 'antd';
import Modal from "../../../../components/Modal";
import { IconInfo } from '../../svgr'

const SDKModal = (props) => {

  const { onCancel, onConfirm } = props;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { addSDKManagement, getSDKManagementList, setIsLoading } = props.sdkManagementStore;
    onConfirm();
    setIsLoading(true);
    await addSDKManagement(values);
    await getSDKManagementList();
    setIsLoading(false)
  };

  const handleConfirm = () => {
    form.submit();
  }

  return (
    <Modal title="Create SDK" confirmText="Submit" visible={true} onConfirm={handleConfirm} onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Client name"
          name="clientName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Board"
          name="boardName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tags"
          name="tags"
          tooltip={{ title: 'Separate tags with spaces', icon: <IconInfo width="22px" height="22px" /> }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Requestor"
          name="requestor"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default inject("sdkManagementStore")(observer(SDKModal));

