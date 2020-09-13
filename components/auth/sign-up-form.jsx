import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Card, Form, Input, Button, Typography } from "antd";
import { UserContext } from "../../contexts/user-context";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 32 },
};

export default function SignUpForm({}) {
  const { loading, error, signIn, signUp } = useContext(UserContext);
  const [form] = Form.useForm();
  const [isSignUp, setIsSignUp] = useState(false);
  const { Title, Text, Link } = Typography;

  const handleSignIn = (values) => {
    const { email, password } = values;
    signIn(email, password);
  };

  const handleRegister = (values) => {
    const { email, password } = values;
    signUp(email, password);
  };

  return (
    <Card style={{ width: "50%", textAlign: "center" }}>
      <Title>{isSignUp ? "Sign Up" : "Sign In"}</Title>
      <Form
        {...layout}
        name="register"
        form={form}
        onFinish={isSignUp ? handleRegister : handleSignIn}
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
            <Text>
              Don't have an account?{" "}
              <Link onClick={() => setIsSignUp(true)}>Sign Up</Link>.
            </Text>
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
      </Form>
    </Card>
  );
}
