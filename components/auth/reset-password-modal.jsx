import React, { useState, useContext, useEffect} from  'react';
import {Button, Form, Input, Modal, Typography} from "antd";
import {UserContext} from "contexts/user-context";
import {forgotPassword, forgotPasswordSubmit} from "utils/aws/auth";

const {Paragraph, Text} = Typography;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

function ResetPasswordModal({ showResetPassModal, setShowResetPassModal }) {
  const [forgotPasswordResolved, setForgotPasswordResolved] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [forgotPasswordForm] = Form.useForm();
  const [completeforgotPasswordForm] = Form.useForm();

  const handleCancel = () => {
    setUserEmail(null);
    setShowResetPassModal(!showResetPassModal);
  }

  async function handleForgotPassword(values) {
    const { email } = values;
    try {
      await forgotPassword(email);
      setForgotPasswordResolved(true);
      setUserEmail(email);
    } catch(error) {
      console.error(error);
    }
  }

  async function handleSubmit(values) {
    const { code, newPassword } = values;
    try {
      await forgotPasswordSubmit(userEmail, code, newPassword);
    } catch(error) {
      console.error(error);
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
          Enter the email address used for this account.
        </Text>
      </Paragraph>
      <Form layout="vertical" form={forgotPasswordForm} onFinish={handleForgotPassword}>
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
        {/*{error && (*/}
        {/*  <Form.Item style={{ justifyContent: "center" }}>*/}
        {/*    <Text style={{ color: "red" }}>{error.message}</Text>*/}
        {/*  </Form.Item>*/}
        {/*)}*/}
        {!forgotPasswordResolved && (<Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Send Verification Code
          </Button>
          </Form.Item>)
        }
      </Form>
      {forgotPasswordResolved && (
        <React.Fragment>
          <Paragraph>
            <Text>
              A verification code has been sent to this email address.
            </Text>
          </Paragraph>
        <Form layout="vertical" form={completeforgotPasswordForm} onFinish={handleSubmit}>
          <Form.Item
            label="Verification Code"
            name="code"
            rules={[{ required: true, message: "Enter the code that was emailed to you"}]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: "Enter your new password"}]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Verify password"
            name="verifyPassword"
            rules={[
              { required: true, message: "Please re-enter your password"},
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
              ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        </React.Fragment>
      )}
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