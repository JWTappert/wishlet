import React, { useContext, useEffect} from  'react';
import {Button, Form, Input, Modal, Typography} from "antd";
import {UserContext} from "contexts/user-context";
const {Paragraph, Text} = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

function ResetPasswordModal({ showResetPassModal, setShowResetPassModal }) {
  const { loading, error, setError, handlePasswordReset } = useContext(UserContext);
  const [form] = Form.useForm();

  console.log({ error });
  useEffect(() => {
    const clearErrors = () => {
      setError(null);
    }
    clearErrors();
  }, [error]);

  const handleCancel = () => {
    setShowResetPassModal(!showResetPassModal);
  }

  const handleSubmit = (values) => {
    const { email } = values;
    try {
      handlePasswordReset(email);
      setShowResetPassModal(!showResetPassModal);
    } catch(error) {
      setError(error);
    }
  }

  return (
    <Modal
      {...layout}
      title="Reset your password"
      visible={showResetPassModal}
      onCancel={() => setShowResetPassModal(!showResetPassModal)}
      onOk={() => console.log('ok')}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
    >
      <Paragraph>
        <Text>
          Enter your email address and you will be sent password reset instructions.
        </Text>
      </Paragraph>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item label="Email" name="email" rules={[
          {
            type: "email",
            message: "This is not valid email",
          },
          {
            required: true,
            message: "Please input your email",
          },
        ]} hasFeedback
        >
          <Input type="text" />
        </Form.Item>
        {error && (
          <Form.Item style={{ justifyContent: "center" }}>
            <Text style={{ color: "red" }}>{error.message}</Text>
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const EmailSentConfirmation = () => {
  return (
    <Paragraph>
      <Text>We have sent you an email to reset your password</Text>
    </Paragraph>
  )
}

export default ResetPasswordModal;