import React, { useState, useContext, useEffect } from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { UserContext } from "contexts/user-context";
import GoogleAuthProvider from "./google-auth-provider";
import ResetPasswordModal from "./reset-password-modal";
import {signIn, signUp} from "utils/aws/auth";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

export default function SignUpForm({}) {
  const { loading, error, setError } = useContext(UserContext);
  const [form] = Form.useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);
  const { Paragraph, Title, Text, Link } = Typography;

  useEffect(() => {
    const clearErrors = () => {
      setError(null);
    }
    clearErrors();
  }, []);

  async function onSignIn(values) {
    const { email, password } = values;
    await signIn(email, password);
  };

  async function onSignUp(values) {
    const { email, password } = values;
    await signUp(email, password);
  };

  function onPasswordResetClick() {
    setOpenResetModal(true);
  }

  return (
    <>
    <Card style={{ width: "50%", textAlign: "center" }}>
      <Title>{isSignUp ? "Sign Up" : "Sign In"}</Title>
      <Form
        {...layout}
        name="register"
        form={form}
        onFinish={isSignUp ? onSignUp : onSignIn}
        scrollToFirstError
      >
        <Form.Item
          style={{ marginBottom: "1em" }}
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "This is not valid email",
            },
            {
              required: true,
              message: "Please input your email",
            },
          ]}
          hasFeedback
        >
          <Input type="text" />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "1em" }}
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              min: 8,
              message: "Minimum length of 8 characters",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{ justifyContent: "center" }}>
          {!isSignUp && (
            <>
            <Paragraph>
              <Text>
                Don't have an account?{" "}
                <Link onClick={() => setIsSignUp(true)}>Sign Up</Link>.
              </Text>
            </Paragraph>
            <Paragraph>
              <Text>
                Forgot your password?{" "}
                <Link onClick={() => onPasswordResetClick()}>Reset Password</Link>.
              </Text>
            </Paragraph>
            </>
          )}
          {isSignUp && (
            <Text>
              Already have an account?{" "}
              <Link onClick={() => setIsSignUp(false)}>Sign in</Link>.
            </Text>
          )}
        </Form.Item>
        {error && (
          <Form.Item style={{ justifyContent: "center" }}>
            <Text style={{ color: "red" }}>{error.message}</Text>
          </Form.Item>
        )}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isSignUp ? "Sign Up" : "Sign in"}
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <GoogleAuthProvider />
        </Form.Item>
      </Form>
    </Card>
      <ResetPasswordModal showResetPassModal={openResetModal} setShowResetPassModal={setOpenResetModal} />
      </>
  );
}
